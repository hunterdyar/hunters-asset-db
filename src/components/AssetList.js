import ListItem from "./ListItem";
import {List} from "@mui/material";
export default function AssetList(props)
{
   return <List spacing={6} >
        {props.viewList.map(function(a){
            return(<ListItem key={a.id} item={a} />)})
        }
    </List>
}
