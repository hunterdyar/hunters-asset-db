import {GetAllAssetsHook} from "../database";
import {useEffect, useState} from "react";
import Fuse from "fuse.js";
import CheckIcon from '@mui/icons-material/Check';
import AssetList from "../components/AssetList";
import {
    Box,
    Checkbox,
    Chip,
    Divider,
    FormControl,
    FormLabel,
    Input,
    Sheet,
    Typography
} from "@mui/joy";

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

    return <div><Sheet components="form" sx={{
        // px: 0
    }}>
    <Box spacing={1}>
        <Box
            role="group"
            aria-labelledby="tagFilter"
            sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, py: 1}}
        >
        <Typography level="body2" >Types:</Typography>
            {meta.types.map(function(t){
                let selected = selectedTypes.includes(t.toLowerCase());
                return <Chip key={t}
                             variant={selected ? "soft" : "plain"}
                             color={selected ? 'primary' : 'neutral'}
                             startDecorator={
                                 selected && <CheckIcon sx={{ zIndex: 1, pointerEvents: 'none' }} />
                             }>
                    <Typography textTransform={"capitalize"}>
                    <Checkbox
                        variant="outlined"
                        color={selected ? 'primary' : 'neutral'}
                        disableIcon
                        overlay
                        label={t}
                        checked={selected}
                        onChange={()=>toggleType(t.toLowerCase())}
                    />
                </Typography>
                </Chip>
            })}
        </Box>
        <Box
            role="group"
            aria-labelledby="tagFilter"
            sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}
        >
            <Typography level="body2">Type:</Typography>
            {meta.tags.map(function(t){
                let selected = selectedTags.includes(t.toLowerCase());
                return <Chip key={t}
                             variant={selected ? "soft" : "plain"}
                             color={selected ? 'primary' : 'neutral'}
                             startDecorator={
                                 selected && <CheckIcon sx={{ zIndex: 1, pointerEvents: 'none' }} />
                             }>
                    <Typography textTransform={"capitalize"}>
                    <Checkbox
                        variant="outlined"
                        color={selected ? 'primary' : 'neutral'}
                        disableIcon
                        overlay
                        label={t}
                        checked={selected}
                        onChange={()=>toggleTag(t.toLowerCase())}

                    />
                    </Typography>

                </Chip>
            })}
            </Box>
        </Box>
        <FormControl>
            <FormLabel><Typography level="body2">Search</Typography></FormLabel>
    <Input id="standard-basic"
           type="search"
           value={filter}
           onChange={e => setFilter(e.target.value)}
           placeholder="Filter assets"
               // InputProps={{
               //     endAdornment: isFiltered ? <InputAdornment position="start" onClick={()=>setFilter("")} sx={{paddingRight:"12px"}}><h2>x</h2></InputAdornment> : null,
               // }}
           endDecorator={
               isFiltered ? <h2 onClick={()=>setFilter("")}>x</h2> : null
           }
           sx={{
                mx: 2,
               my:1
           }}
    />
        </FormControl>
</Sheet>
    <Divider />
    <AssetList viewList={filteredAssets} types={selectedTypes} tags={selectedTags} />
</div>
}
