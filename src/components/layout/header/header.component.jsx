import React from "react";
import "./header.styles.scss";
import {withRouter} from "react-router-dom";
import AccountSection from "../account-section/account-section.component";

function Header({history}){
    return (
        <div className="header-component">
            <div className="logo" onClick={() => history.push("/")}>
                Play Now
            </div>
            <div className="right-section">
                <AccountSection />
            </div>
        </div>
    )
}

export default withRouter(Header);
