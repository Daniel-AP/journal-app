import { current } from "@reduxjs/toolkit";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import {
  deleteNote,
  setActiveNote,
  setAlertInfo,
  setAlertOpen,
  setError,
  setNoteImages,
  setNotes,
  toggleIsFetching,
  toggleIsLoading,
  updateNote,
} from "./journalSlice";

export const startCreateNote = () => {
  return async (dispatch, getState) => {
    dispatch(setError(false));
    dispatch(toggleIsLoading());

    const uid = getState().auth.uid;

    const newNote = {
      title: "",
      description: "",
      time: new Date().getTime(),
      imgURLs: [],
    };

    try {
      const newDoc = doc(collection(FirebaseDB, `${uid}/journal/notes`));
      await setDoc(newDoc, newNote);

      newNote.id = newDoc.id;

      dispatch(setActiveNote(newNote));
      dispatch(setNotes({ [newNote.id]: newNote }));
      dispatch(toggleIsLoading());
    } catch (error) {
      dispatch(setError(true));

      dispatch(
        startShowAlert("An error has ocurred. Please try again later.", false)
      );
      dispatch(toggleIsLoading());
    }
  };
};

export const startLoadNotes = () => {
  return async (dispatch, getState) => {
    dispatch(setError(false));
    dispatch(toggleIsFetching());

    const uid = getState().auth.uid;
    const notes = {};

    try {
      const collectionRef = collection(FirebaseDB, `${uid}/journal/notes`);
      const data = await getDocs(collectionRef);

      data.forEach((note) => {
        notes[note.id] = { id: note.id, ...note.data() };
      });

      dispatch(setNotes(notes));
      dispatch(toggleIsFetching());
    } catch (error) {
      dispatch(setError(true));

      dispatch(
        startShowAlert("An error has ocurred. Please try again later.", false)
      );
      dispatch(toggleIsFetching());
    }
  };
};

export const startUpdateNote = ({ title, description, oldImages, newImages }) => {
  return async (dispatch, getState) => {

    dispatch(setError(false));
    dispatch(toggleIsLoading());

    const uid = getState().auth.uid;
    const activeNote = getState().journal.active;
    const cloudURL = "https://api.cloudinary.com/v1_1/dzwbo7ldx/upload";
    const promises = [];

    oldImages = oldImages.map(image => image.data_url);

    for (const image of newImages) {
      promises.push(

        (async () => {
          const formData = new FormData();

          formData.append("file", image.file);
          formData.append("upload_preset", "journal-app");

          try {

            const resp = await fetch(cloudURL, {
              method: "POST",
              body: formData,
            });

            if (!resp.ok) throw new Error();

            const cloudResp = await resp.json();

            return cloudResp.secure_url;

          } catch (error) {
              
          }
        })()
      );

    }

    try {

      const docRef = doc(FirebaseDB, `${uid}/journal/notes/${activeNote.id}`);

      const newURLs = await Promise.all(promises);

      dispatch(setNoteImages(oldImages.concat(newURLs)));

      await updateDoc(docRef, {
        ...activeNote,
        title,
        description,
        imgURLs: oldImages.concat(newURLs)
      });

      dispatch(updateNote({
        ...activeNote,
        title,
        description,
        imgURLs: oldImages.concat(newURLs)
      }));

      dispatch(toggleIsLoading());
      dispatch(startShowAlert("Note's been saved.", true));

    } catch (error) {

      dispatch(setError(true));

      dispatch(
        startShowAlert("An error has ocurred. Please try again later.", false)
      );

      dispatch(toggleIsLoading());

    }
  };
};

export const startDeleteNote = (id) => {

  return async (dispatch, getState) => {
    dispatch(setError(false));
    dispatch(toggleIsLoading());

    const uid = getState().auth.uid;

    try {
      const docRef = doc(FirebaseDB, `${uid}/journal/notes/${id}`);
      await deleteDoc(docRef);

      dispatch(deleteNote(id));
      dispatch(toggleIsLoading());

    } catch (error) {
      
      dispatch(setError(true));

      dispatch(
        startShowAlert("An error has ocurred. Please try again later.", false)
      );

      dispatch(toggleIsLoading());
    }
  };
  
};

export const startShowAlert = (message, success) => {
  return async (dispatch, getState) => {
    const state = getState();

    if (state.journal.alert.open) {
      dispatch(setAlertOpen(false));

      setTimeout(() => {
        dispatch(
          setAlertInfo({
            message,
            success,
          })
        );

        dispatch(setAlertOpen(true));
      }, 200);
    } else {
      dispatch(
        setAlertInfo({
          message,
          success,
        })
      );

      dispatch(setAlertOpen(true));
    }
  };
};
