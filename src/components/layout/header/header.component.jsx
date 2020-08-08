import React from "react";
import "./header.styles.scss";
import {withRouter} from "react-router-dom";
import AccountSection from "../account-section/account-section.component";
import SearchGame from "../search-game/search-game.component";

function Header({history}){
    return (
        <div className="header-component">
            <div className="left-section">
                <div className="logo" onClick={() => history.push("/")}>
                    Play Now
                </div>
            </div>
            <SearchGame />
            <div className="right-section">
                <AccountSection />
            </div>
        </div>
    )
}

export default withRouter(Header);
