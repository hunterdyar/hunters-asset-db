import Copyright from "./Copyright";
import {Link} from "react-router-dom";
import {AspectRatio, Button, Grid, Typography} from "@mui/joy";
import React from "react";

function PreviewImage(props) {
    if(props.item.smallPreview)
    {
        if(props.item.smallPreview && props.item.smallPreview !== "")
        {
            return <AspectRatio objectFit="contain" variant="plain" ratio={1}>
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
        <Grid container sx={{py: 1, pl: 1}} spacing={1}>
            <Grid item xs={12} >
                    <Typography level="h4">
                        {item.name}
                    </Typography>
            </Grid>
            <Grid item xs={8}>
                    <Typography level={"body2"} component="span" textAlign={"left"}>
                        {item.type}
                    </Typography>

                    <Typography level={"body2"} component={"span"} textAlign={"right"}>
                        {item.tags.join(", ")}
                    </Typography>
                    <Typography >
                        <Button variant={"outlined"}>
                            <Link to={"/assets/"+item.id} >More Info</Link></Button>
                    </Typography>
                    <Typography textAlign={"right"}>
                        <Copyright license={item.license} small/>
                    </Typography>
            </Grid>
            <Grid item xs={"auto"}></Grid>
            <Grid item xs={3}>
                    <PreviewImage  item = {item}/>
            </Grid>

        </Grid>
    );
}
