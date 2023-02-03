import {Card, CardContent, Divider, Typography} from "@mui/joy";

export default function About()
{
    return <>

        <Divider />
        <Card>
            <CardContent>
                <Typography level="body1" sx={{pb: 1}}>This website was created by <a href="https://hdyar.com" rel="noreferrer" target="_blank">Hunter Dyar</a>, for his students.</Typography>
                <Typography level="body1" sx={{pb: 1}}>All assets on this site were created by Hunter, or by a student worker explicitly doing paid work to create assets for this collection. No student coursework is allowed on the collection, although students are encouraged to use the assets for their own projects.</Typography>
                <Typography level="body1" sx={{pb: 1}}>This site was created with <a href="https://reactjs.org/" rel="noreferrer" target="_blank">React</a>, using <a href="https://mui.com/" rel="noreferrer" target="_blank">MUI</a>. It is hosted on <a href="https://github.com/hunterdyar/hunters-asset-db/" rel="noreferrer" target="_blank">Github</a>.</Typography>
                </CardContent>
        </Card>
    </>
}
