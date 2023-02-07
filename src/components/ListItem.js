import Copyright from "./Copyright";
import {Link} from "react-router-dom";
import {AspectRatio, Button, Grid, Typography} from "@mui/joy";
import React from "react";

function PreviewImage(props) {
    if(props.item.smallPreview)
    {
        if(props.item.smallPreview && props.item.smallPreview !== "")
        {
            return <AspectRatio objectFit="contain" variant="plain" ratio={2}>
                <Link size="small" to={"/assets/"+props.item.id}><img alt={props.item.name} src={props.item.smallPreview} width="100%"/>
                </Link>
            </AspectRatio>;
        }else if(props.item.preview && props.item.preview !== "")
        {
            return  <AspectRatio objectFit="contain" variant="plain"><Link size="small" to={"/assets/"+props.item.id}><img alt={props.item.name} src={props.item.preview} width="100%"/>
            </Link></AspectRatio>;
        }else
        {
            return <></>
        }
    }

    return null;
}

export default function ListItem(props)
{
    let item = props.item;
    return (
        <Grid container sx={{py: 1}}>
            <Grid item xs={12} sx={{ flexGrow:1 }}>
                    <Typography level="h4">
                        {item.name}
                    </Typography>
            </Grid>
            <Grid item xs={6}>
                    <Typography level={"body2"} component="span" textAlign={"left"}>
                        {item.type}
                    </Typography>
            </Grid>
            <Grid item xs={6}>
                    <Typography level={"body2"} component={"span"} textAlign={"right"}>
                        {item.tags.map((t)=>{return t+" ";})}
                    </Typography>
            </Grid>

            <Grid item xs={12}>
                    <PreviewImage  item = {item} sx={{px:5}}/>
            </Grid>
            <Grid xs={6}>
                <Typography >
                    <Button variant={"outlined"}>
                        <Link to={"/assets/"+item.id} >More Info</Link></Button>
                </Typography>
            </Grid>
            <Grid item xs={6}>
                <Typography textAlign={"right"}>
                    <Copyright license={item.license} small/>
                </Typography>
            </Grid>
        </Grid>
    );
}
