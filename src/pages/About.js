import {Card, CardContent, Divider, Typography} from "@mui/material";
import {Link} from "react-router-dom";

export default function About()
{
    return <>
        <Typography>
        <Link size="small" to={"/"}>Back</Link>
        </Typography>
        <Divider />
        <Card>
            <CardContent>
                <Typography>
                <p>This website was created by <a href="http://hdyar.com" target="_blank">Hunter Dyar</a>, for his students.</p>
                <p>All assets on this site were created by Hunter, or by a student worker explicitly doing paid work to create assets for this collection. No student coursework is allowed on the collection, although students are encouraged to use the assets for their own projects.</p>
                <p>This site was created with <a href="https://reactjs.org/" target="_blank">React</a>, using <a href="https://mui.com/" target="_blank">MUI</a>. It is hosted on <a href="https://github.com/hunterdyar/hunters-asset-db/" target="_blank">Github</a>.</p>
                </Typography>
                </CardContent>
        </Card>
    </>
}
