import firebase from "firebase/app";
import {firestore} from "./firebase";
import {logError} from "../logger";
const uuid = require("uuid-random");

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

export async function addReview(reviewData) {
    const id = uuid();
    try {
        await firestore
            .doc(`reviews/${id}`)
            .set({...reviewData, id: id});
    } catch (err) {
        logError("updateGameCount", err);
        throw err;
    }
    try {
        await firestore
            .doc(`games/${reviewData.gameId}`)
            .update({
                reviews: firebase.firestore.FieldValue.increment(1),
                likes: reviewData.liked ? firebase.firestore.FieldValue.increment(1) : null});
    } catch (err) {
        logError("updateGameCount", err);
        throw err;
    }
}
