import React from "react";
import "./account-section.styles.scss";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {createStructuredSelector} from "reselect";
import {currentUserSelector} from "../../../redux/user/user-selector";
import {auth} from "../../../util/firebase/firebase";
import {navigateToAccount, navigateToRegister} from "../../../util/navigationUtils";

function AccountSection({history, currentUser}) {
    const signOut = async () => {
        await auth.signOut();
    };
    const goToAccount = () => {
        navigateToAccount(history);
    };
    const goToRegister = () => {
        navigateToRegister(history);
    };
    return (
        <div className="account-section-component">
            {currentUser ?
                <div>
                    <div className="button-section">
                        <button  className="register-button"
                                 onClick={goToAccount}>
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
                                 onClick={goToRegister}>
                            Register
                        </button>
                    </div>
                    <div className="button-section">
                        <button className="login-button"
                                onClick={goToAccount}>
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
