import {combineReducers} from "redux";
import userNs from "./user/user-reducer";

const rootReducer = combineReducers({
    userNs
});

export default rootReducer;
