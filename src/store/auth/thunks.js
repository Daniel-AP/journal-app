import { signInWithEmailPassword, signInWithGoogle, signUpWithEmailPassword } from "../../firebase/providers"
import { checkingCredentials, login, logout } from "./authSlice"

export const startGoogleSignIn = () => {

    return async(dispatch) => {

        dispatch( checkingCredentials() );

        const result = await signInWithGoogle();

        if (result.ok) dispatch( login(result) );
        else dispatch( logout(result) );

    } 

}

export const startEmailPasswordSignIn = (email, password) => {

    return async(dispatch) => {

        dispatch( checkingCredentials() );

        const result = await signInWithEmailPassword(email, password);

        if (result.ok) dispatch( login(result) );
        else dispatch( logout(result) );

    }

}

export const startEmailPasswordSignUp = (email, password, name) => {

    return async(dispatch) => {

        dispatch( checkingCredentials() );

        const result = await signUpWithEmailPassword(email, password, name);

        if (result.ok) dispatch( login(result) );
        else dispatch( logout(result) )

    }

}