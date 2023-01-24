import {Link, Outlet} from "react-router-dom";
import {Container, Typography} from "@mui/material";

const Layout = () => {
    return (
        <Container maxWidth="sm" sx={{pt:1}}>
            <Typography variant="h3" component="div">
                Hunter's Asset Collection
            </Typography>
            <Typography>
                <Link to={"/"}>Home</Link> <Link to={"/about"}>About</Link>
            </Typography>
            <Outlet />
        </Container>
    )
};

export default Layout;
