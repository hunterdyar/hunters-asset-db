import ListItem from "./Components/ListItem";
import {
    Box,
    Chip,
    Container,
    Divider, FormGroup, FormLabel,
    InputAdornment,
    List,
    ListSubheader,
    Paper,
    Stack,
    TextField,
    Typography
} from "@mui/material";
import {useState} from "react";

import './app.css';
import AssetList from "./Components/AssetList";
import {AssetListHook} from "./hooks/assetHooks";

let assets = require('./assets.json');
const assetTypes = [...new Set(assets.map((Val) => Val.type))];
const assetTags = initGetTags();
function initGetTags()
{
    let tags = new Set();
    assets.map(function (x)
    {
        x.tags.map(function(t){
            tags.add(t);
        })
    });
    let tagsArray = [];
    return Array.from(tags);;
}

function App() {
    const [filteredAssets,selectedTypes,selectedTags,toggleType,toggleTag,query,setQuery,clearQuery,filtered] = AssetListHook(assets);
  return (
    <div className="App">
        <Container maxWidth="sm" sx={{pt:1}}>
            <Typography variant="h3" component="div">
                Hunter's Asset Collection
            </Typography>
            <Box components="form" padding={1}>
            <Stack spacing={1}>
                <Stack direction="row" spacing={1}>
                <Typography component="legend">Types:</Typography>
                    {assetTypes.map(function(t){
                    let selected = selectedTypes.includes(t.toLowerCase());
                    let variant = selected ? "filled" : "outlined";
                    return <Chip label={t} variant={variant} onClick={(e)=>toggleType(t.toLowerCase())}>{t} </Chip>
                })}</Stack>
                <Stack direction="row" spacing={1}>
                    <Typography component="legend" >Type:</Typography>
                    {assetTags.map(function(t){
                    let selected = selectedTags.includes(t.toLowerCase());
                    let variant = selected ? "filled" : "outlined";
                    return <Chip label={t} variant={variant} onClick={(e)=>toggleTag(t.toLowerCase())}>{t} </Chip>
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
        </Container>
    </div>
  );
}

export default App;
