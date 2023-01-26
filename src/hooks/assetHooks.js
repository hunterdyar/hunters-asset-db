import {useEffect, useState} from "react";
import Fuse from "fuse.js";
import {GetAllAssetsHook} from "../database";

export function AssetListHook() {
    const [assets, setAssets] = GetAllAssetsHook();
    const [selectedTypes,setSelectedTypes] = useState([]);
    const [selectedTags,setSelectedTags] = useState([]);
    const [query,setQuery] = useState("");
    const [filtered, setFiltered] = useState(false);
    const [result, setResult] = useState(assets);
    function clearQuery()
    {
        setQuery("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    function toggleType(itemType){
        let sTypes = selectedTypes;
        itemType = itemType.toLowerCase();
        if(sTypes.includes(itemType))
        {
            var index = sTypes.indexOf(itemType);
            if (index !== -1) {
                sTypes.splice(index, 1);
            }
        }else{
            sTypes.push(itemType.toLowerCase());
        }
        setSelectedTypes(sTypes);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    function toggleTag(itemTag){
        console.log("toggle: "+itemTag);
        itemTag = itemTag.toLowerCase();
        if(selectedTags.includes(itemTag))
        {
            var index = selectedTags.indexOf(itemTag);
            if (index !== -1) {
                selectedTags.splice(index, 1);
            }
        }else{
            selectedTags.push(itemTag.toLowerCase());
        }
        setSelectedTags(selectedTags);
    }

    //Returns the list with hard (non-fuzzy) filtered by the material/tag selections.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    function getRadioFiltered()
    {
        return assets.filter(function (item){
            var hasType;
            var hasTag = true;
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
                for(var i = 0;i<item.tags.length;i++)
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
    }

    useEffect(() => {
        let filtered = getRadioFiltered();
        const fuse = new Fuse(filtered, {
            distance: 30,
            threshold: 0.49,
            keys: ["name", "description"]
        });

        if (query === "") {
            setResult(filtered);
            setFiltered(false)
        } else {
            setResult(fuse.search(query).map((x)=>x.item));
            setFiltered(true)
        }
    }, [query,assets,toggleType,toggleTag,getRadioFiltered]);

    return [result, selectedTypes, selectedTags, toggleType, toggleTag,query,setQuery,clearQuery,filtered];
}
