import {setGames, setReviews} from "../redux/categories-and-games/categories-and-games-actions";
import {extractRetrieveResultsFromFirestore} from "./firebase/firebase";
import {setUsers} from "../redux/user/user-actions";

function extractCollectionData(collectionName, onSuccess) {
    return (dispatch, getState, getFirebase) => {
        return getFirebase()
            .firestore()
            .collection(collectionName)
            .get()
            .then((querySnapshot) => {
                const data = extractRetrieveResultsFromFirestore(querySnapshot);
                dispatch(onSuccess(data))
            })
    }
}
export function fetchGames() {
    return extractCollectionData("games", setGames);
}
export function fetchReviews() {
    return extractCollectionData("reviews", setReviews);
}
export function fetchUsers() {
    return extractCollectionData("users", setUsers);
}
