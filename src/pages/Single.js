import {Link, useParams} from "react-router-dom";
import {CardActions, CardContent, Divider, Typography} from "@mui/material";
import Copyright from "../components/Copyright";
import assets from "../assets.json";

function DownloadLinks(props) {
    if(props.item.downloads) {
        if (props.item.downloads.length > 0) {
            return <ul>
                {props.item.downloads.map((dl) => {
                    return <li key={dl}><a href={dl}>{dl.split('/').pop()}</a></li>;
                })}
            </ul>
        }
    }
    //else
    if(props.item.download) {
        return <ul>
            <li><a href={props.item.download}>{props.item.download.split('/').pop()}</a></li>
        </ul>
    }
}

function PreviewImage(props) {
    if(props.item.preview && props.item.preview !== "")
    {
        return <img src={props.item.preview} alt={props.item.name} width="100%"/>
    }else{
        return <></>
    }
}
export default function Single(){
        const params = useParams();
        const item = assets.find((x)=> x.id === params.id);
        return(
            <>
                <Typography>
                    <Link size="small" to={"/"}>Back</Link>
                </Typography>
                <Divider />
                <CardContent>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        {item.type}
                    </Typography>
                    <Typography variant="h5" component="div">
                        {item.name}
                    </Typography>
                    <Typography variant="body1">
                        by {item.author}
                    </Typography>
                    <Divider />
                    <Typography variant="body2">
                        {item.description}
                    </Typography>
                    <PreviewImage item={item} />
                    <DownloadLinks item={item} />
                <Divider />
                    <Typography>
                        <Copyright sx={{pt:1}}  license={item.license}/>
                    </Typography>
                </CardContent>
                <CardActions>
                    <Link size="small" to={"/"}>Back</Link>
                </CardActions>
            </>
            );
}
