import {GetAllAssetsHook} from "../database";
import {useEffect, useState} from "react";

export default function Test()
{
    const [assets] = GetAllAssetsHook();
    const [tagList,setTagList] = useState([]);
    const [typeList,setTypeList] = useState([]);
    const [selectedTags, setSelectedTags] = useState([]);
    const [selectedTypes, setSelectedTypes] = useState([]);

    //change to useMemo?
    const [filtered, setFiltered] = useState(assets);

    //Update the initial tag list. this only happens on asset data from database.
    useEffect(()=>{
        //Update Type list
        let types = [...new Set(assets.map((Val) => Val.type))];
        setTypeList(types);
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
        setTagList(Array.from(tags));
    },[assets]);

    //Update the viewed (filtered) assets. This happens on asset data or filter change.
    useEffect(()=>{
            setFiltered(assets.filter(function (item){
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
            }))
        },[assets,selectedTypes,selectedTags]);

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
        {filtered.map((item)=>
        {return (<li key={item.id}>{item.name}</li>)})}
    </ul>
        tags<ul>
            {tagList.map(function (x)
            {return (<li key={x}><button onClick={()=>toggleTag(x)}>{x}</button></li>)})}
        </ul>
        types<ul>
            {typeList.map(function (x)
            {return (<li key={x}><button onClick={()=>toggleType(x)}>{x}</button></li>)})}
        </ul>
    </>
}
