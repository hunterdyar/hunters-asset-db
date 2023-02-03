import {GetAllAssetsHook} from "../database";
import {useEffect, useState} from "react";
import Fuse from "fuse.js";
import {InputAdornment, TextField} from "@mui/material";

export default function Test()
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
                console.log("checking filter. tags n types:",selectedTags,selectedTypes);
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
        },[assets,selectedTypes,selectedTags,filter]);

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
        console.log("Set selected tags",tags)
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

    return <>assets<ul>
        {filteredAssets.map((item)=>
        {return (<li key={item.id}>{item.name}</li>)})}
    </ul>
        tags<ul>
            {meta.tags.map(function (x)
            {return (<li key={x}><button onClick={()=>toggleTag(x)}>{x}</button></li>)})}
        </ul>
        types<ul>
            {meta.types.map(function (x)
            {return (<li key={x}><button onClick={()=>toggleType(x)}>{x}</button></li>)})}
        </ul>
        <TextField id="standard-basic" label="  Search" variant="standard" type="search" fullWidth
                   value={filter}
                   onChange={e => setFilter(e.target.value)}
                   InputProps={{
                       endAdornment: isFiltered ? <InputAdornment position="start" onClick={()=>setFilter("")} sx={{paddingRight:"12px"}}><h2>x</h2></InputAdornment> : null,
                   }}
                   sx={{

                   }}
        />
    </>
}
