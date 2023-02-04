import {Link as RouterLink, Outlet} from "react-router-dom";
import {CssBaseline, Link, CssVarsProvider, Sheet, Typography, Box} from "@mui/joy";
import {CrateIcon} from "../components/Crate";
const Layout = () => {
    return (
    <CssVarsProvider>
        <CssBaseline />
        <Sheet variant="outlined" sx={{
            mx: 'auto',
            width: 620,
            my: 4,
            py: 2,
            px: 1,
            boxShadow: 'md',
            borderRadius: 'sm'

        }}>
            <Box sx={{
                display: 'flex',
                justifyContent: "center",
                pb: 2
            }}>
                <Typography level="h2" component="h1" textAlign={"center"} startDecorator={<CrateIcon sx={{pr:1}} />} endDecorator={<CrateIcon sx={{pl:1}}/>}>
                    Hunter's Asset Collection
                </Typography>
            </Box>
            <Typography level="body1" textAlign={"center"} >
                <Link component={RouterLink} variant={"outlined"} color={"neutral"} to={"/"}>Home</Link> <Link component={RouterLink} color={"neutral"} variant={"outlined"} to={"/about"}>About</Link>
            </Typography>
            <Outlet />
        </Sheet>
    </CssVarsProvider>
    )
};

export default Layout;
