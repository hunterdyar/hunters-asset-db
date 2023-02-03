import Copyright from "./Copyright";
import {Link} from "react-router-dom";
import {Box, Button, Card, Typography} from "@mui/joy";

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

export default function ListItem(props)
{
    let item = props.item;
    return (
        <Card orientation="horizontal">
            <Box>
                    <Typography variant="h5" component="div">
                        {item.name}
                    </Typography>
                    <Typography level={"body2"} >
                        {item.type}
                    </Typography>
                    <Typography level={"body2"} >
                        {item.tags.map((t)=>{return t+" ";})}
                    </Typography>
                    <Typography>
                        <Copyright license={item.license} small/>
                    </Typography>
                        <Typography>
                            <Button variant={"outlined"}>
                                <Link to={"/assets/"+item.id} >More Info</Link></Button>
                        </Typography>
            </Box>
                    <PreviewImage item = {item}/>

        </Card>
    );
}
