import {CardContent, Sheet, Typography} from "@mui/joy";

export default function About()
{
    return <>
        <Sheet sx={{
            pt: 2
        }}>
            <CardContent>
                <Typography level="body1" sx={{pb: 1}}>This website was created by <a href="https://hdyar.com" rel="noreferrer" target="_blank">Hunter Dyar</a>, for his students.</Typography>
                <Typography level="body1" sx={{pb: 1}}>All assets on this site were created by Hunter, or by a student worker explicitly doing paid work to create assets for this collection. No student coursework is allowed on the collection, although students are encouraged to use the assets for their own projects.</Typography>
                <Typography level="body1" sx={{pb: 1}}>This site was created with <a href="https://reactjs.org/" rel="noreferrer" target="_blank">React</a>, using <a href="https://mui.com/joy-ui/getting-started/overview/" rel="noreferrer" target="_blank">MUI Joy UI</a>. The sourcecode is available on <a href="https://github.com/hunterdyar/hunters-asset-db/" rel="noreferrer" target="_blank">Github</a> and deployed with <a href="https://azure.microsoft.com/en-us/" rel="noreferrer" target="_blank">Microsoft Azure web services</a>: static site hosting, CosmosDB, and storage.</Typography>
                </CardContent>
        </Sheet>
    </>
}
