import {Button, Card, CardContent, Divider, Grid, Typography} from "@mui/material";
import Copyright from "./Copyright";
import {Link} from "react-router-dom";

function PreviewImage(props) {
    if(props.item.smallPreview)
    {
        if(props.item.smallPreview && props.item.presmallPreviewview !== "")
        {
            return  <Link size="small" to={"/assets/"+props.item.id}><img alt={props.item.name} src={props.item.smallPreview} width="100%"/>
                </Link>
            }else{
            return <></>
        }
    }

    return null;
}

export default function ListItem({item})
{
    return (
        <Card>
            <CardContent>
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <Typography variant="h5" component="div">
                        {item.name}
                    </Typography>
                </Grid>
                <Grid item xs={8}>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        {item.type}
                    </Typography>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        {item.tags.map((t)=>{return t+" ";})}
                    </Typography>
                    <Typography>
                        <Copyright license={item.license} small/>
                    </Typography>
                        <Typography>
                            <Button variant={"outlined"}>
                                <Link to={"/assets/"+item.id} >More Info</Link></Button>
                        </Typography>
                </Grid>
                <Grid item xs={4}>
                    <PreviewImage item = {item}/>
                </Grid>

            <Divider />
            </Grid>
            </CardContent>
        </Card>
    );
}
