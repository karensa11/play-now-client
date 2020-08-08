import React, {Component} from "react";
import "./App.css";
import Header from "./layout/header/header.component";
import {Switch, Route} from "react-router-dom";
import Home from "./pages/home/home.component";
import CategoriesStripe from "./layout/categories-stripe/categories-stripe.component";
import Info from "./pages/info/info.component";
import Footer from "./layout/footer/footer.component";
import {auth, createUserProfileDocument} from "../util/firebase";
import {removeCurrentUser, setCurrentUser} from "../redux/user/user-actions";
import {connect} from "react-redux";
import AccountManagement from "./pages/account/account.component";
import CategoryOverview from "./pages/category-overview/category-overview.component";
import GameOverview from "./pages/game-overview/game-overview.component";

class App extends Component {
    componentDidMount() {
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
            <div className="App">
                <Header/>
                <CategoriesStripe/>
                <div className="main-section">
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route path="/info" component={Info} />
                        <Route path="/account" component={AccountManagement} />
                        <Route path="/category/:id" component={CategoryOverview} />
                        <Route path="/game/:id" component={GameOverview} />
                    </Switch>
                </div>
                <Footer/>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    setCurrentUser: (user) => dispatch(setCurrentUser(user)),
    removeCurrentUser: () => dispatch(removeCurrentUser())
});

export default connect(null, mapDispatchToProps)(App);
