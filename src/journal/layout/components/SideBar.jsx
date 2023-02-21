import Drawer from "@mui/material/Drawer"
import Box from "@mui/material/Box"
import { InternalDrawer } from "./InternalDrawer"
import { useDispatch, useSelector } from "react-redux"
import { toggleMobileMenu } from "../../../store/journal/journalSlice"

export const SideBar = ({ drawerWidth }) => {

    const dispatch = useDispatch();

    const mobileMenuOpen = useSelector( state => state.journal.mobileMenu );

    return (
            <Box
                component="nav"
                sx={{width: { sm:  drawerWidth}, flexShrink: {sm: 0}}}
            >
                <Drawer
                    variant="permanent"
                    open={ true }
                    sx={{display: {xs: "none", sm: "block" }, "& .MuiDrawer-paper": { width: `${drawerWidth}px` }}}
                >
                    <InternalDrawer />
                </Drawer>

                <Drawer
                    variant="temporary"
                    open={ mobileMenuOpen }
                    keepMounted={ true }
                    onClose={ () => dispatch( toggleMobileMenu() ) }
                    sx={{display: {xs: "block", sm: "none" }, "& .MuiDrawer-paper": { width: `${drawerWidth}px` }}}
                >
                    <InternalDrawer />
                </Drawer>
            </Box>
    )
}
