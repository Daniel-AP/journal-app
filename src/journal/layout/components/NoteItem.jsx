import { DeleteOutline, TurnedInNot } from "@mui/icons-material"
import { Grid, IconButton, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material"
import React from "react"
import { useSelector } from "react-redux"

export const NoteItem = ({ title, description, id, deleteNote, openNote }) => {

    const { isLoading, active } = useSelector(state => state.journal);

    return (
        <ListItem

            disablePadding
            className="animate__animated animate__zoomIn animate__faster"
            sx={{
                ":hover": {
                    "& .css-1ih6lwz": {
                        display: "flex"
                    }
                }
            }}

        >
            <ListItemButton
                onClick={ () => openNote(id) }
                sx={{
                    justifyContent: "space-between",
                    backgroundColor: active?.id === id ? "rgba(0, 0, 0, 0.04)" : ""
                }}>

                <ListItemIcon>
                    <TurnedInNot />
                </ListItemIcon>

                <Grid container sx={{minWidth: 0}}>
                    <ListItemText sx={{width: "100%"}} title={ title } disableTypography primary={
                        <Typography
                            sx={{
                                fontStyle: !title ? "italic" : "normal",
                            }}
                            noWrap
                        >
                            {
                                !title
                                ? "Untitled note"
                                : title
                            }
                        </Typography>
                    } />
                    <ListItemText title={ description } disableTypography secondary={
                        <Typography
                            sx={{
                                fontStyle: !description ? "italic" : "normal"
                            }}
                            noWrap
                        >
                            {
                                !description
                                ? "No description"
                                : description
                            }
                        </Typography>
                    } />
                </Grid>

                <ListItemIcon sx={{
                    justifyContent: "flex-end",
                    display: { xs: "flex", lg: active?.id === id ? "flex" : "none" },
                    minWidth: "fit-content"
                    }}
                >

                    <IconButton
                        disabled={ isLoading }
                        onMouseDown={ e => e.stopPropagation() }
                        onClick={ (e) => {
                            e.stopPropagation();

                            deleteNote(id);
                        }}
                        edge="end"
                    >
                        <DeleteOutline />
                    </IconButton>

                </ListItemIcon>
            </ListItemButton>
        </ListItem>
    )
}
