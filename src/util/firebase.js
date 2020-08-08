import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

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

const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({prompt: "select_account"});

export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

export async function createUserProfileDocument(user) {
    const ref = firestore.doc(`users/${user.uid}`);
    const snapshot = await ref.get();
    if(!snapshot.exists) {
        const {displayName, email, isInternal} = user;
        const createAt = new Date();
        try {
            await ref.set({
                displayName,
                email,
                createAt,
                isInternal
            })
        } catch (err)  {
            console.log("failed to create " + err.message);
        }
    }
    return ref;
}

export async function checkUserExistsByMail(email) {
    try {
        const snapshot = await firestore
            .collection("users")
            .where("email", "==", email)
            .get();
        return snapshot.size === 1;
    } catch (err) {
        console.log("failed to get " +err.message);
        return true;
    }
}

export async function updateUserDetails(userDetails) {
    console.log(userDetails);
    try {
        await firestore
            .doc(`users/${userDetails.id}`)
            .set(userDetails);
    } catch (err) {
        console.log("failed to update "+err.message);
        throw err;
    }
}

export async function updatePassword(newPassword) {
    try {
        const user = auth.currentUser;
        await user.updatePassword(newPassword);
    } catch (err) {
        console.log("failed to update "+err.message);
        throw err;
    }
}
