import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";
import { FirebaseAuth } from "./config";

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({prompt: "select_account"})

export const signInWithGoogle = async() => {

    try {
        
        const result = await signInWithPopup(FirebaseAuth, googleProvider);
        const { displayName, uid, photoURL, email } = result.user;

        return {
            ok: true,
            displayName,
            uid,
            photoURL,
            email
        }

    } catch (error) {
        
        return {
            ok: false,
            errorMessage: error.code.includes("popup-closed-by-user") ? null : error.message ,
            errorCode: error.code
        }
    }

}

export const signInWithEmailPassword = async(email, password) => {

    try {

        const result = await signInWithEmailAndPassword(FirebaseAuth, email, password);
        const { displayName, uid, photoURL } = result.user;

        return {
            ok: true,
            displayName,
            uid,
            photoURL,
            email
        }
        
    } catch (error) {

        return {
            ok: false,
            errorMessage: error.message,
            errorCode: error.code
        }

    }

}

export const signUpWithEmailPassword = async(email, password, name) => {

    try {
        
        const result = await createUserWithEmailAndPassword(FirebaseAuth, email, password);
        const { uid, photoURL } = result.user;

        await updateProfile(FirebaseAuth.currentUser, {
            displayName: name
        })

        return {
            ok: true,
            uid,
            photoURL,
            email,
            displayName: name
        }

    } catch (error) {

        return {

            ok: false,
            errorMessage: error.message,
            errorCode: error.code

        }

    }

}