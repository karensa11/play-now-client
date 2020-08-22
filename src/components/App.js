import React, {Component} from "react";
import "./App.scss";
import Header from "./layout/header/header.component";
import {Switch, Route} from "react-router-dom";
import Home from "./pages/home/home.component";
import CategoriesStripe from "./layout/categories-stripe/categories-stripe.component";
import Info from "./pages/info/info.component";
import Footer from "./layout/footer/footer.component";
import {auth} from "../util/firebase/firebase";
import {createUserProfileDocument} from "../util/firebase/firebaseAuthenticationAndUsers";
import {removeCurrentUser, setCurrentUser} from "../redux/user/user-actions";
import {connect} from "react-redux";
import AccountManagement from "./pages/account/account.component";
import GameOverview from "./pages/game-overview/game-overview.component";
import Category from "./pages/category/category.component";
import AllCategoriesSelection from "./layout/all-categories-selection/all-categories-selection.component";
import {fetchGames} from "../util/thunk";
import SearchPage from "./pages/search/search-page.component";

class App extends Component {
    componentDidMount() {
        this.props.fetchGames();
        this.unsubscribeFromAuth = auth.onAuthStateChanged( async user => {
            if(user) {
                const userRef = await createUserProfileDocument(user);
                userRef.onSnapshot(snapshot => {
                    this.props.setCurrentUser({
                        id: snapshot.id,
                        ...snapshot.data()
                    })
                });
            } else {
                this.props.removeCurrentUser();
            }
        })
    }

    render()
    {
        return (
            <div className="app-component">
                <div className="main-section">
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/search" component={SearchPage} />
                        <Route path="/info" component={Info} />
                        <Route path="/account" component={AccountManagement} />
                        <Route path="/category" component={Category} />
                        <Route path="/game/:id" component={GameOverview} />
                    </Switch>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    setCurrentUser: (user) => dispatch(setCurrentUser(user)),
    removeCurrentUser: () => dispatch(removeCurrentUser()),
    fetchGames: () => dispatch(fetchGames())
});

export default connect(null, mapDispatchToProps)(App);
