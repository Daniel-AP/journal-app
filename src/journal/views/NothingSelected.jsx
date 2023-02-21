import AddOutlined from "@mui/icons-material/AddOutlined"
import StarOutline from "@mui/icons-material/StarOutline"
import Grid from "@mui/material/Grid"
import IconButton from "@mui/material/IconButton"
import Typography from "@mui/material/Typography"
import { useDispatch, useSelector } from "react-redux"
import { startCreateNote } from "../../store/journal/thunks"

export const NothingSelected = () => {

    const dispatch = useDispatch();
    const isLoading = useSelector( state => state.journal.isLoading );

    const createNewNote = async() => {

        dispatch( startCreateNote() );

    }
    
    return (
            <Grid
                className="animate__animated animate__fadeIn animate__faster"
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
                sx={{
                    backgroundColor: "primary.main",
                    borderRadius: 2,
                    p: 3,
                    position: "relative",
                    flexGrow: 1
                }}
            >
                <Grid
                    container
                    item
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                >
                    <StarOutline sx={{fontSize: 75, color: "white"}}/>
                    <Typography color="white" sx={{fontWeight: 500, textAlign: "center"}} variant="h6" component="h2">
                        Create or select a new entry
                    </Typography>
                </Grid>
                <IconButton
                    disabled={ isLoading }
                    onClick={ createNewNote }
                    size="large"
                    sx={{
                        position: "absolute",
                        right: "24px",
                        bottom: "24px",
                        backgroundColor: "white !important",
                        ":hover": { backgroundColor: "whitesmoke" },
                    }}
                >
                    <AddOutlined fontSize="30" />
                </IconButton>
            </Grid>
    )
}
