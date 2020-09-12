import React, {Component} from "react";
import "./App.scss";
import {Switch, Route, Redirect} from "react-router-dom";
import Home from "./pages/home/home.component";
import Info from "./pages/info/info.component";
import {auth} from "../util/firebase/firebase";
import {createUserProfileDocument} from "../util/firebase/firebaseAuthenticationAndUsers";
import {removeCurrentUser, setCurrentUser} from "../redux/user/user-actions";
import {connect} from "react-redux";
import AccountManagement from "./pages/account/account.component";
import GameOverview from "./pages/game-overview/game-overview.component";
import Category from "./pages/category/category.component";
import {fetchGames, fetchReviews, fetchUsers} from "../util/thunk";
import SearchPage from "./pages/search/search-page.component";
import {createStructuredSelector} from "reselect";
import {currentUserSelector} from "../redux/user/user-selector";
import UserOverview from "./pages/user-overview/user-overview.component";

class App extends Component {
    componentDidMount() {
        this.props.fetchGames();
        this.props.fetchReviews();
        this.props.fetchUsers();
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
                        <Route exact path="/game/:id" component={GameOverview} />
                        <Redirect exact from="/game/:id/reload" to="/game/:id" />
                        <Route exact path="/user/:username" render={(props) => {
                            return (
                                this.props.currentUser &&
                                this.props.currentUser.username === props.match.params.username ?
                                    <Redirect to="/account" /> : <UserOverview {...props} />
                            )
                        }} />
                    </Switch>
                </div>
            </div>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    currentUser: currentUserSelector
});

const mapDispatchToProps = dispatch => ({
    setCurrentUser: (user) => dispatch(setCurrentUser(user)),
    removeCurrentUser: () => dispatch(removeCurrentUser()),
    fetchGames: () => dispatch(fetchGames()),
    fetchReviews: () => dispatch(fetchReviews()),
    fetchUsers: () => dispatch(fetchUsers())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
