import LogoutOutlined from "@mui/icons-material/LogoutOutlined"
import MenuOutlined from "@mui/icons-material/MenuOutlined"
import AppBar from "@mui/material/AppBar"
import IconButton from "@mui/material/IconButton"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import { useDispatch } from "react-redux"
import { FirebaseAuth } from "../../../firebase/config"
import { reset, setActiveNote, setNotes, toggleMobileMenu } from "../../../store/journal/journalSlice"

export const NavBar = ({ drawerWidth }) => {

    const dispatch = useDispatch();

    const logout = async() => {

        await FirebaseAuth.signOut();
        
        dispatch( reset() );

    }

    return (
            <AppBar
                position="fixed"
                sx={{width: { xs: "100%", sm: `calc(100% - ${ drawerWidth }px)` }}}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        edge="start"
                        sx={{display: {sm: "none"}, mr: 2}}
                        onClick={() => dispatch( toggleMobileMenu() ) }
                    >
                        <MenuOutlined color="inherit"/>
                    </IconButton>
                    <Typography sx={{ flexGrow: 1 }} variant="h6" noWrap component="h1">Journal App</Typography>
                    <IconButton onClick={ () => logout() } color="inherit">
                        <LogoutOutlined/>
                    </IconButton>
                </Toolbar>
            </AppBar>
    )
}
