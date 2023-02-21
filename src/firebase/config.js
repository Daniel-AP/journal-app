import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";

const firebaseConfig = {

  apiKey: "AIzaSyCstHRuG-VMG36NuZPpDPHNS4dC6MKESRs",
  authDomain: "journal-app-55a2e.firebaseapp.com",
  projectId: "journal-app-55a2e",
  storageBucket: "journal-app-55a2e.appspot.com",
  messagingSenderId: "1098772390196",
  appId: "1:1098772390196:web:8e39bb4057aeaa11cfc561"

};

export const FirebaseApp = initializeApp( firebaseConfig );
export const FirebaseAuth = getAuth( FirebaseApp );
export const FirebaseDB = getFirestore( FirebaseApp );