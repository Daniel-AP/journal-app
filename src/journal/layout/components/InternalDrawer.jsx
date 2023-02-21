import Divider from "@mui/material/Divider"
import IconButton from "@mui/material/IconButton"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew"
import { useDispatch, useSelector } from "react-redux"
import { ListNotes } from "./ListNotes"
import { toggleMobileMenu } from "../../../store/journal/journalSlice"

export const InternalDrawer = () => {

    const displayName = useSelector(state => state.auth.displayName);
    const notes = useSelector(state => state.journal.notes);

    const dispatch = useDispatch();

    return (
            <>
                <Toolbar sx={{gap: "1rem", justifyContent: { xs: "initial", sm: "center" }}}>
                    <IconButton
                        onClick={() => dispatch( toggleMobileMenu() )}
                        sx={{display: { sm: "none" }}}
                        >
                            <ArrowBackIosNewIcon />
                    </IconButton>
                    <Typography title={ displayName }  variant="h6" noWrap component="div">{ displayName }</Typography>
                </Toolbar>
                <Divider />

                <ListNotes notes={ notes }/>

            </>
    )
}
