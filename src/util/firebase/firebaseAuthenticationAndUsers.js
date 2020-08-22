import {auth, firestore} from "./firebase";
import firebase from "firebase";
import {logError} from "../logger";

const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({prompt: "select_account"});

const facebookProvider = new firebase.auth.FacebookAuthProvider();
facebookProvider.setCustomParameters({"display": "popup"});

export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);
export const signInWithFacebook = () => auth.signInWithPopup(facebookProvider);

export async function createUserProfileDocument(user) {
    const ref = firestore.doc(`users/${user.uid}`);
    const snapshot = await ref.get();
    if(!snapshot.exists) {
        const {displayName, email, isInternal} = user;
        const internal = !!isInternal;
        const createAt = new Date();
        try {
            await ref.set({
                displayName,
                email,
                createAt,
                internal
            })
        } catch (err)  {
            logError("createUserProfileDocument", err);
            throw err;
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
        logError("checkUserExistsByMail", err);
        return true;
    }
}

export async function updateUserDetails(userDetails) {
    try {
        await firestore
            .doc(`users/${userDetails.id}`)
            .set(userDetails);
    } catch (err) {
        logError("updateUserDetails", err);
        throw err;
    }
}

export async function updatePassword(newPassword) {
    try {
        const user = auth.currentUser;
        await user.updatePassword(newPassword);
    } catch (err) {
        logError("updatePassword", err);
        throw err;
    }
}
