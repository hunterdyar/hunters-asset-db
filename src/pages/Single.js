import {useParams} from "react-router-dom";
import Copyright, {AttributionText} from "../components/Copyright";
import {GetAssetHook} from "../database";
import {useState} from "react";
import {Box, Button, Divider, Link, Sheet, Typography} from "@mui/joy";

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
            setCopytext("Copied!");
            delay(750).then(() => setCopytext(defaultCopyText))
            // Copy the text inside the text field
            navigator.clipboard.writeText(attribution);
        }

        return(
            <>
                <Sheet key={id} sx={{
                    py: 3
                }}>
                    <Typography level="h3" component="div" textAlign={"center"}>
                        {item.name}
                    </Typography>
                    <Typography level="body2" color="text.secondary" gutterBottom>
                        {item.type}
                    </Typography>

                    <Typography level="body1">
                        by {item.author}
                    </Typography>
                    <Divider />
                    <Typography level="body1">
                        {item.description}
                    </Typography>
                    <PreviewImage item={item} />
                    <Divider />
                    <Typography level={"h5"}>Downloads</Typography>
                    <DownloadLinks item={item} />
                <Divider />
                    <Box sx={{
                        py:2
                    }}>
                    <Typography>
                        <Copyright sx={{pt:1}}  license={item.license}/><br />
                    </Typography>
                        <Link component={Button} size="small" to="#" onClick={copyAttribution}>{copytext}</Link>
                    </Box>
                    </Sheet>
            </>
        );
}
