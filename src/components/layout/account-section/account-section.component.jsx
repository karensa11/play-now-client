import React from "react";
import "./account-section.styles.scss";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {createStructuredSelector} from "reselect";
import {currentUserSelector} from "../../../redux/user/user-selector";
import {auth} from "../../../util/firebase";

function AccountSection({history, currentUser}) {
    const signOut = async () => {
        await auth.signOut();
    };
    const navigateToAccount = () => {
        history.push("/account");
    };
    const navigateToRegister = () => {
        history.push("/account/register");
    };
    return (
        <div className="account-section-component">
            {currentUser ?
                <div>
                    <div className="button-section">
                        <button  className="register-button"
                                 onClick={navigateToAccount}>
                            Account
                        </button>
                    </div>
                    <div className="button-section">
                        <button  className="login-button"
                                 onClick={signOut}>
                            Logout
                        </button>
                    </div>
                </div> :
                <div>
                    <div className="button-section">
                        <button  className="register-button"
                                 onClick={navigateToRegister}>
                            Register
                        </button>
                    </div>
                    <div className="button-section">
                        <button className="login-button"
                                onClick={navigateToAccount}>
                            Login
                        </button>
                    </div>
                </div>
            }
        </div>
    )
}

const mapStateToProps = createStructuredSelector({
    currentUser: currentUserSelector
});

export default withRouter(connect(mapStateToProps)(AccountSection));
