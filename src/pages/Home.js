import {GetAllAssetsHook} from "../database";
import {useEffect, useState} from "react";
import Fuse from "fuse.js";
import {Box, Chip, Divider, InputAdornment, Stack, TextField, Typography} from "@mui/material";
import AssetList from "../components/AssetList";

export default function Home()
{
    const [assets] = GetAllAssetsHook();
    const [meta,setMeta] = useState({tags:[],types:[]});
    const [selectedTags, setSelectedTags] = useState([]);
    const [selectedTypes, setSelectedTypes] = useState([]);
    const [isFiltered,setIsFiltered] = useState(false);
    const [filter, setFilter] = useState("");
    //change to useMemo?
    const [filteredAssets, setFilteredAssets] = useState(assets);

    //Update the initial tag list. this only happens on asset data from database.
    useEffect(()=>{
        //Update Type list
        let types = [...new Set(assets.map((Val) => Val.type))];
        //update TagList
        let tags = new Set();
            assets.map(function (x)
            {
                x.tags.map(function(t){
                    tags.add(t.toLowerCase());
                    return null;
                })
                return null;
            });
        //this makes the other useEffect get called twice.
        //We could wrap these into a single "filter settings" object, which only changes when any of the things change.
        //including init.
        let m = {tags:Array.from(tags),types:types};
        setMeta(m);
    },[assets]);

    //Update the viewed (filtered) assets. This happens on asset data or filter change.
    useEffect(()=>{
            let f = assets.filter(function (item){
                let hasType;
                let hasTag = true;
                //filter function.
                if(selectedTypes.length === 0)
                {
                    hasType = true;
                }else{
                    hasType = selectedTypes.includes(item.type.toLowerCase());
                }

                //filter function.
                if(selectedTags.length === 0)
                {
                    hasTag = true;
                }else{
                    for(let i = 0; i<item.tags.length; i++)
                    {
                        hasTag = selectedTags.includes(item.tags[i].toLowerCase());
                        if(hasTag)//find first true.
                        {
                            break;
                        }
                    }
                }
                return hasType && hasTag;
            });
        //now f is filtered by our buttons. Next, apply fuzzy search.
        const fuse = new Fuse(f, {
            distance: 30,
            threshold: 0.49,
            keys: ["name", "description"]
        });

        if (filter === "") {
            //no fuzzy search!
            setFilteredAssets(f);
            setIsFiltered(f.length === assets.length)
        } else {
            setFilteredAssets(fuse.search(filter).map((x)=>x.item));
            setIsFiltered(true);//for sure true
        }
        },[assets,selectedTypes,selectedTags,filter]);//i dont think isFiltered is a dependency here.

    function toggleTag(itemTag){
        itemTag = itemTag.toLowerCase();
        let tags = [...selectedTags];
        if(tags.includes(itemTag))
        {
            let index = tags.indexOf(itemTag);
            if (index !== -1) {
                tags.splice(index, 1);
            }
        }else{
            tags.push(itemTag.toLowerCase());
        }
        setSelectedTags(tags);
    }
    function toggleType(itemType){
        itemType = itemType.toLowerCase();
        let types = [...selectedTypes];
        if(types.includes(itemType))
        {
            let index = types.indexOf(itemType);
            if (index !== -1) {
                types.splice(index, 1);
            }
        }else{
            types.push(itemType.toLowerCase());
        }
        console.log("Set selected types",types)
        setSelectedTypes(types);
    }

    return <div><Box components="form" padding={1}>
    <Stack spacing={1}>
        <Stack direction="row" spacing={1}>
            <Typography component="legend">Types:</Typography>
            {meta.types.map(function(t){
                let selected = selectedTypes.includes(t.toLowerCase());
                let variant = selected ? "filled" : "outlined";
                return <Chip key={t} label={t} variant={variant} onClick={()=>toggleType(t.toLowerCase())} />
            })}</Stack>
        <Stack direction="row" spacing={1}>
            <Typography component="legend" >Type:</Typography>
            {meta.tags.map(function(t){
                let selected = selectedTags.includes(t.toLowerCase());
                let variant = selected ? "filled" : "outlined";
                return <Chip key={t} label={t} variant={variant} onClick={()=>toggleTag(t.toLowerCase())} />
            })}
        </Stack>
    </Stack>
    <TextField id="standard-basic" label="  Search" variant="standard" type="search" fullWidth
               value={filter}
               onChange={e => setFilter(e.target.value)}
               InputProps={{
                   endAdornment: isFiltered ? <InputAdornment position="start" onClick={()=>setFilter("")} sx={{paddingRight:"12px"}}><h2>x</h2></InputAdornment> : null,
               }}
               sx={{

               }}
    />
</Box>
    <Divider />
    <AssetList viewList={filteredAssets} types={selectedTypes} tags={selectedTags} />
</div>
}
