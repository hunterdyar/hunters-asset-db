import {Card, CardContent, Divider, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import {GetAllAssetsHook} from "../database";

export default function Test()
{
    const [assets, setAssets] = GetAllAssetsHook();

    return <>
        <Typography>
            <Link size="small" to={"/"}>Back</Link>
        </Typography>
        <Divider />
        <Card>
            <CardContent>
                <Typography>
                    {assets.map((x)=>x.name)}
                   </Typography>
            </CardContent>
        </Card>
    </>
}
