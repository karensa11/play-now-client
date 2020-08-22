import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/database";

export const firebaseConfig = {
    apiKey: "AIzaSyAmzVBeFQv4rkLEEjtvVly1tHg1mig5zdo",
    authDomain: "play-now-1323c.firebaseapp.com",
    databaseURL: "https://play-now-1323c.firebaseio.com",
    projectId: "play-now-1323c",
    storageBucket: "play-now-1323c.appspot.com",
    messagingSenderId: "142862999503",
    appId: "1:142862999503:web:6ff63db389ac53ce957cba",
    measurementId: "G-8ZLCJDEM9X"
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export function extractRetrieveResultsFromFirestore(querySnapshot) {
    const result = [];
    querySnapshot.forEach(item => result.push(item.data()));
    return result;
}
