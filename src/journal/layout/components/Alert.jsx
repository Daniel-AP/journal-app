import { CloseOutlined, DoneRounded, ErrorRounded } from "@mui/icons-material"
import { IconButton, Paper, Portal, Snackbar, useMediaQuery } from "@mui/material"
import { Box } from "@mui/system"
import { useDispatch, useSelector } from "react-redux"
import { setAlertOpen } from "../../../store/journal/journalSlice"

export const Alert = () => {

    const dispatch = useDispatch();

    const { open, message, success } = useSelector(state => state.journal.alert);

    const sm = useMediaQuery("(min-width: 600px)");

    return (
        <Portal>
            <Snackbar
                open={ open }
                onClose={ () => dispatch( setAlertOpen(false) ) }
                autoHideDuration={ 3000 }
                sx={{
                    width: { sm: "30%", lg: "25%" },
                    borderRadius: 1
                }}
                anchorOrigin={{
                    vertical: sm ? "bottom" : "top",
                    horizontal: sm ? "left" : "center"
                 }}
            >
                <Box
                    sx={{
                        display: "flex",
                        color: "white",
                        alignItems: "center",
                        justifyContent: "space-between",
                        px: 2 ,
                        borderRadius: 1 ,
                        backgroundColor: "#434343",
                        width: "100%",
                        boxShadow: "0px 3px 3px -2px rgb(0 0 0 / 20%), 0px 3px 4px 0px rgb(0 0 0 / 14%), 0px 1px 8px 0px rgb(0 0 0 / 12%);"
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            gap: 1,
                            alignItems: "center"
                        }}
                    >
                        {
                            success
                            ? <DoneRounded />
                            : <ErrorRounded />
                        }
                        <p>
                            { message }
                        </p>
                    </Box>
                    <IconButton onClick={ () => dispatch(setAlertOpen(false)) }>
                        <CloseOutlined color="secondary" />
                    </IconButton>
                </Box>
            </Snackbar>
        </Portal>
    )
}
