import { createSlice } from "@reduxjs/toolkit";
import { types } from "./types";

export const authSlice = createSlice({

    name: "auth",
    initialState: {

        status: types.checking,
        uid: null,
        email: null,
        displayName: null,
        photoURL: null,
        errorMessage: null

    },
    reducers: {
        login: (state, { payload }) => {

            state.status = types.authenticated;
            state.uid = payload.uid;
            state.email = payload.email;
            state.displayName = payload.displayName;
            state.photoURL = payload.photoURL;
            state.errorMessage = null;

        },

        logout: (state, { payload }) => {

            state.status = types.notAuthenticated;
            state.uid = null;
            state.email = null;
            state.displayName = null;
            state.photoURL = null;
            state.errorMessage = payload?.errorMessage ?? null;

        },

        checkingCredentials: (state) => {

            state.status = types.checking;

        },

        clearErrorMessages: (state) => {

            state.errorMessage = null;

        }
    },
    
});


export const { login, logout, checkingCredentials, clearErrorMessages } = authSlice.actions;