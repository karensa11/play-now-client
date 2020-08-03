import React from "react";
import "./account.styles.scss";
import Login from "../../account/login/login.component";
import {Switch, Route, Redirect} from "react-router-dom";
import {currentUserSelector} from "../../../redux/user/user-selector";
import {createStructuredSelector} from "reselect";
import {connect} from "react-redux";
import Register from "../../account/register/register.component";
import AccountDetails from "../../account/account-details/account-details.component";

function AccountManagement({match, currentUser}) {
    return (
        <div className="account-page">
            <Switch>
                <Route     exact path={`${match.path}/register`}
                           render={() => currentUser ?
                               <Redirect to="/" /> : <Register />}
                />
                <Route     exact path={`${match.path}`}
                           render={() => currentUser ?
                               <AccountDetails /> : <Login />}
                />
            </Switch>
        </div>
    )
}

const mapStateToProps = createStructuredSelector({
    currentUser: currentUserSelector
});

export default connect(mapStateToProps)(AccountManagement);
