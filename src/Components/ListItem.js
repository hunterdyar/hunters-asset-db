import {Button, Card, CardActions, CardContent, Divider, Typography} from "@mui/material";
import assets from "../assets.json";
import {useState} from "react";

export default function ListItem({item})
{
    return (
        <Card sx={{ minWidth: 275, my:1}}>
            <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    {item.type}
                </Typography>
                <Typography variant="h5" component="div">
                    {item.name}
                </Typography>
                <Typography variant="body2">
                    {item.description}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" href={item.download} target="_blank">Download</Button>
            </CardActions>
            <Divider />
        </Card>
    );
}
