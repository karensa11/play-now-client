import firebase from "firebase";
import {firestore} from "./firebase";
import {logError} from "../logger";

export async function updateGameCount(gameDetails) {
    try {
        await firestore
            .doc(`games/${gameDetails.id}`)
            .update({usageCount: firebase.firestore.FieldValue.increment(1)});
    } catch (err) {
        logError("updateGameCount", err);
        throw err;
    }
}
