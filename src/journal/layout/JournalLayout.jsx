import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import { NavBar } from "./components";
import { SideBar } from "./components/SideBar";
import { Alert } from "./components/Alert";

export const JournalLayout = ({ children }) => {

    const drawerWidth = 240;

    return (
        <Box className="animate__animated animate__fadeIn" sx={{display: "flex", height: "100%"}}>

            <NavBar drawerWidth={ drawerWidth } />

            <SideBar drawerWidth={ drawerWidth }/>

            <Box
                component="main"
                sx={{flexGrow: 1, p: 3, overflow: "auto", display: "flex", flexDirection: "column"}}
            >
                <Toolbar />
                { children }
            </Box>

            <Alert />

        </Box>
    )
}
