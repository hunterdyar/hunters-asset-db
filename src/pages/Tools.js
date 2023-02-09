import {CardContent, Sheet, Typography} from "@mui/joy";

let tools = {
    "tools": [{
        "name": "URP Camera Effects",
        "url": "https://github.com/hunterdyar/Unity-Transition-Effects"
        },
        {
            "name": "Rougelike Level Generator",
            "url": "https://github.com/hunterdyar/2DRougelikeLevelGenerator"
        },
        {
            "name": "Waypoint System",
            "url": "https://github.com/hunterdyar/BloopsWaypointSystem"
        },
        {
            "name": "Image to Mp4 Utility",
            "url": "https://github.com/hunterdyar/ImgToMp4Utility"
        },
        {
            "name": "Unity Jam Menu Generator",
            "url": "https://github.com/hunterdyar/Unity-Jam-Menu-Generator"
        },
        {
            "name": "Visual Scripting Nodes for Shapes Tool",
            "url": "https://github.com/hunterdyar/visual-shapes"
        },
        {
            "name": "Scriptable Object Input System",
            "url": "https://github.com/hunterdyar/SOInputSystem"
        },
        {
            "name": "Simple SO Level Manager",
            "url": "https://github.com/hunterdyar/SimpleLevelManager"
        },
        {
            "name": "SO State Machine",
            "url": "https://github.com/hunterdyar/SOStateMachine"
        },
        {
            "name": "Advanced Grid Framework",
            "url": "https://github.com/hunterdyar/GridFramework"
        }

    ],
    "samples": [
        {
            "name": "Top Down Example Game",
            "url": "https://github.com/hunterdyar/TopDownExampleGame"
        },
        {
            "name": "Unity Simple Sokabon",
            "url": "https://github.com/hunterdyar/UnitySimpleSokabon"
        },
        {
            "name": "Platform Character Controller",
            "url": "https://github.com/hunterdyar/BPlatformController"
        },
        {
            "name": "Unity Utility",
            "url": "https://github.com/hunterdyar/BloopsUnityUtility"
        },
        {
            "name": "Bill's Space Invaders",
            "url": "https://github.com/Chatham-Immersive-Media-Lab/SpaceInvaders"
        },
        {
            "name": "One Button Game Mechanics",
            "url": "https://github.com/Chatham-Immersive-Media-Lab/Unity-OneButtonMechanics"
        },
        {
            "name": "Simple 2D Character Controllers",
            "url": "https://github.com/hunterdyar/UnitySimpleCharacterControllers"
        },
        {
            "name": "Hoplite Clone",
            "url": "https://github.com/hunterdyar/HopLiteClone"
        },
        {
            "name": "Simple Snake Example",
            "url": "https://github.com/hunterdyar/simpleSnakeUnity"
        },
        {
            "name": "Simple Object Pooler Example",
            "url": "https://github.com/hunterdyar/SimpleObjectPooler"
        }
    ]
}
export default function Tools()
{
    return <>
        <Sheet sx={{
            pt: 2
        }}>
            <CardContent>
                <Typography level="body1" sx={{pb: 1}}>
                    In addition to assets, I have created a number of other tools and sample projects for Game Development, which you may find useful.
                </Typography>
                <Typography level="body1" sx={{pb: 1}}>
                    This page is, effectively, select repositories from my <a href={"https://github.com/hunterdyar/"}>GitHub</a>, where I publish all sorts of tools, examples, and experiments.
                </Typography>
                <Typography level={"h3"} >
                    Unity Tools
                </Typography>
                <Typography level="body1" sx={{pb: 1}}>

                <ul>
                    {tools.tools.map(x=>{
                        return <li key={x.name}><a href={x.url}>{x.name}</a></li>
                    })}
                </ul>
                </Typography>
                <Typography level={"h3"} >
                    Sample code and Example Projects
                </Typography>
                <Typography level="body1" sx={{pb: 1}}>
                <ul>
                    {tools.samples.map(x=>{
                        return <li key={x.name}><a href={x.url}>{x.name}</a></li>
                    })}
                </ul>
                </Typography>
            </CardContent>
        </Sheet>
    </>
}
