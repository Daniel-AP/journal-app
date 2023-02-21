import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FirebaseAuth } from "../firebase/config";
import { login, logout } from "../store/auth/authSlice";
import { startLoadNotes } from "../store/journal/thunks";
import { types } from "../store/auth/types";

export const useCheckAuth = () => {

    const status = useSelector(state => state.auth.status);
    const dispatch = useDispatch();

    useEffect(() => {
        
        onAuthStateChanged(FirebaseAuth, async(user) => {

        if (!user) return dispatch( logout() );

        const { displayName, uid, photoURL, email } = user;

        dispatch( login({ displayName, uid, photoURL, email }) );
        dispatch( startLoadNotes() );

        })
    
    }, [])

}
