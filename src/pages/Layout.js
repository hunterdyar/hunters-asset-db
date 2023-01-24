import {Outlet} from "react-router-dom";
import {Container, Typography} from "@mui/material";

const Layout = () => {
    return (
        <Container maxWidth="sm" sx={{pt:1}}>
            <Typography variant="h3" component="div">
                Hunter's Asset Collection
            </Typography>
            <Outlet />
        </Container>
    )
};

export default Layout;
