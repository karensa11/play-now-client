import {createStore, applyMiddleware} from "redux";
import rootReducer from "./rootReducer";
import {logger} from "redux-logger/src";
import {persistStore} from "redux-persist";
import thunk from "redux-thunk";

const middlewares = [thunk];

if(process.env.NODE_ENV === "development") {
    middlewares.push(logger);
}

export const store = createStore(rootReducer, applyMiddleware(...middlewares));

export const persistor = persistStore(store);

export default {store, persistor};
