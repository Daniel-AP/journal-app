import { createSlice } from "@reduxjs/toolkit";

const initialState = {

    isFetching: false,
    isLoading: false,
    notes: {},
    active: null,
    alert: {
        message: null,
        success: false,
        open: false,
    },
    mobileMenu: false,
    error: false

};

export const journalSlice = createSlice({

    name: "journal",

    initialState,

    reducers: {

        reset: () => initialState,

        toggleIsLoading: (state) => {

            state.isLoading = !state.isLoading;

        },

        toggleIsFetching: (state) => {

            state.isFetching = !state.isFetching;

        },

        setActiveNote: (state, { payload }) => {

            state.active = payload;
            

        },

        setNotes: (state, { payload }) => {

            Object.assign(state.notes, payload);

        },

        setNoteImages: (state, { payload }) => {

            state.active.imgURLs = payload;

        },

        updateNote: (state, { payload : note }) => {

            state.notes[note.id] = note;

        },

        deleteNote: (state, { payload: id }) => {

            if (state.active?.id === id) state.active = null;
            delete state.notes[id];

        },

        setAlertInfo: (state, { payload : alertInfo }) => {

            state.alert.message = alertInfo.message;
            state.alert.success = alertInfo.success;

        },

        setAlertOpen: (state, { payload }) => {

            state.alert.open = payload;

        },

        toggleMobileMenu: (state) => {

            state.mobileMenu = !state.mobileMenu;

        },

        setError: (state, { payload }) => {

            state.error = payload;

        }

    }

});


export const {

    reset,
    deleteNote,
    updateNote,
    toggleIsFetching,
    toggleIsLoading,
    setActiveNote,
    setNotes,
    setNoteImages,
    setAlertInfo,
    setAlertOpen,
    toggleMobileMenu,
    setError

} = journalSlice.actions;