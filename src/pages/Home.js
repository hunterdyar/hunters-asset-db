import {Box, Chip, Divider, InputAdornment, Stack, TextField, Typography} from "@mui/material";
import AssetList from "../components/AssetList";
import {AssetListHook} from "../hooks/assetHooks";
import {useRef} from "react";
import {GetAllAssetsHook} from "../database";


export default function Home()
{
    let assetTypesRef = useRef([]);
    let assetTagsRef = useRef([]);
    const [assets] = GetAllAssetsHook();
    const [filteredAssets,selectedTypes,selectedTags,toggleType,toggleTag,query,setQuery,clearQuery,filtered] = AssetListHook(assets);
    // const assetTypesCallback = useCallback(()=>{
    //     assetTypesRef.current = [...[new Set(assets.map((Val) => Val.type))]];
    // },[assets]);
    //
    // const assetTagsCallback = useCallback(()=>{
    //     let tags = new Set();
    //     assets.map(function (x)
    //     {
    //         x.tags.map(function(t){
    //             tags.add(t.toLowerCase());
    //             return null;
    //         })
    //         return null;
    //     });
    //     assetTagsRef.current = Array.from(tags);
    // },[assets]);
    return <div><Box components="form" padding={1}>
        <Stack spacing={1}>
            <Stack direction="row" spacing={1}>
                <Typography component="legend">Types:</Typography>
                {assetTypesRef.current.map(function(t){
                    let selected = selectedTypes.includes(t.toLowerCase());
                    let variant = selected ? "filled" : "outlined";
                    return <Chip key={t} label={t} variant={variant} onClick={()=>toggleType(t.toLowerCase())} />
                })}</Stack>
            <Stack direction="row" spacing={1}>
                <Typography component="legend" >Type:</Typography>
                {assetTagsRef.current.map(function(t){
                    let selected = selectedTags.includes(t.toLowerCase());
                    let variant = selected ? "filled" : "outlined";
                    return <Chip key={t} label={t} variant={variant} onClick={()=>toggleTag(t.toLowerCase())} />
                })}
            </Stack>
        </Stack>
        <TextField id="standard-basic" label="  Search" variant="standard" type="search" fullWidth
                   value={query}
                   onChange={e => setQuery(e.target.value)}
                   InputProps={{
                       endAdornment: filtered ? <InputAdornment position="start" onClick={clearQuery} sx={{paddingRight:"12px"}}><h2>x</h2></InputAdornment> : null,
                   }}
                   sx={{

                   }}
        />
    </Box>
    <Divider />
    <AssetList viewList={filteredAssets} types={selectedTypes} tags={selectedTags} />
    </div>
}
