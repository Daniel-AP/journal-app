import { List, ListItem, Typography, useMediaQuery } from "@mui/material"
import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { setActiveNote, toggleMobileMenu } from "../../../store/journal/journalSlice"
import { startDeleteNote, startShowAlert } from "../../../store/journal/thunks"
import { NoteItem } from "./NoteItem"

export const ListNotes = ({ notes }) => {

    const dispatch = useDispatch();
    const error = useSelector(state => state.journal.error);

    const sm = useMediaQuery("(min-width: 600px)");
    
    const deleteNote = async(id) => {
    
        await dispatch( startDeleteNote(id) );

        if(!error) dispatch( startShowAlert("Note's been deleted.", true) );

    }

    const openNote = (id) => {

        dispatch( setActiveNote(notes[id]) );

        if(!sm) dispatch( toggleMobileMenu() );

    }

    return (
        <List sx={{justifyContent: "center", display: "flex", flexDirection: "column-reverse"}}>
            {
                !!Object.keys(notes).length
                ? (
                    Object.values(notes).map(note => (
                        <NoteItem deleteNote={ deleteNote } openNote={ openNote } key={ note.id } {...note} />
                    ))
                )
                : (
                    <ListItem className="animate__animated animate__fadeIn" sx={{justifyContent: "center"}}>
                        <Typography variant="p" component="p" >No notes created</Typography>
                    </ListItem>
                )
            }
        </List>
    )
}
