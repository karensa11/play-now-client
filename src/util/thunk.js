import {setGames} from "../redux/categories-and-games/categories-and-games-actions";
import {extractRetrieveResultsFromFirestore} from "./utils";

export function fetchGames() {
    return (dispatch, getState, getFirebase) => {
        return getFirebase()
            .firestore()
            .collection("games")
            .get()
            .then((querySnapshot) => {
                const games = extractRetrieveResultsFromFirestore(querySnapshot);
                dispatch(setGames(games))})
    }
}
