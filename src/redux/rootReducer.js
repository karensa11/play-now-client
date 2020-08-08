import {combineReducers} from "redux";
import userNs from "./user/user-reducer";
import categoriesAndGamesNs from "./categories-and-games/categories-and-games-reducer";

const rootReducer = combineReducers({
    userNs,
    categoriesAndGamesNs
});

export default rootReducer;
