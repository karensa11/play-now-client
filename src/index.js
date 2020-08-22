import React from "react";
import ReactDOM from "react-dom";
import firebase from "firebase/app";
import "./index.css";
import App from "./components/App";
import {BrowserRouter} from "react-router-dom";
import * as serviceWorker from "./serviceWorker";
import {Provider} from "react-redux";
import {store} from "./redux/store";
import {ReactReduxFirebaseProvider} from "react-redux-firebase";
import {createFirestoreInstance} from "redux-firestore";

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <React.StrictMode>
                <ReactReduxFirebaseProvider
                    firebase={firebase}
                    dispatch={store.dispatch}
                    config={{}}
                    createFirebaseInstance={createFirestoreInstance}
                >
                <App />
                </ReactReduxFirebaseProvider>
            </React.StrictMode>
        </BrowserRouter>
    </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
