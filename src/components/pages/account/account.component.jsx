import React from "react";
import "./account.styles.scss";
import Login from "../login/login.component.jsx";
import {Switch, Route, Redirect} from "react-router-dom";
import {currentUserSelector} from "../../../redux/user/user-selector";
import {createStructuredSelector} from "reselect";
import {connect} from "react-redux";
import Register from "../register/register.component";
import AccountDetails from "../account-details/account-details.component";
import LayoutWithHeaderCategoriesFooter
    from "../../layout/layout-with-header-categories-footer/layout-with-header-categories-footer.component";

function AccountManagement({match, currentUser}) {
    return (
        <LayoutWithHeaderCategoriesFooter>
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
        </LayoutWithHeaderCategoriesFooter>
    )
}

const mapStateToProps = createStructuredSelector({
    currentUser: currentUserSelector
});

export default connect(mapStateToProps)(AccountManagement);
