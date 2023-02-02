import {Link, useHref, useLocation, useParams} from "react-router-dom";
import {CardActions, CardContent, Divider, Typography} from "@mui/material";
import Copyright from "../components/Copyright";
import {GetAssetHook} from "../database";
import {useState} from "react";

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

function AttributionText(item)
{
    let url = "http://assets.hdyar.com/"+useHref(useLocation());
    //todo: license to license name and link as separate objects. ie: refactor license component to pull that data into a function we can export and use here.
    return '"'+item.name+"' by "+item.author+". From Hunter's Asset Collection ("+url+"). Licensed under Creative Commons "+item.license;
}

function PreviewImage(props) {
    if(props.item.preview && props.item.preview !== "")
    {
        return <img src={props.item.preview} alt={props.item.name} width="100%"/>
    }else{
        return <></>
    }
}
//Delay used for text of "Copied!" when copying attribution.
function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}
export default function Single(){
        const params = useParams();
        const [id,item] = GetAssetHook(params.id);
        const defaultCopyText = "Copy Attribution";
        const [copytext, setCopytext] = useState(defaultCopyText)
        let attribution = AttributionText(item);
        //Copy Attribution
        function copyAttribution()
        {
            setCopytext("Copied!"+id);
            delay(750).then(() => setCopytext(defaultCopyText))
            // Copy the text inside the text field
            navigator.clipboard.writeText(attribution);
        }
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
                        <p><Link size="small" to="#" onClick={copyAttribution}>{copytext}</Link></p>
                    </Typography>
                </CardContent>
                <CardActions>
                    <Link size="small" to={"/"}>Back</Link>
                </CardActions>
            </>
            );
}
