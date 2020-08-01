import React from "react";
import "./header.styles.scss";
import {withRouter} from "react-router-dom";

function Header({history}){
    return (
        <div className="header-component">
            <div className="logo" onClick={() => history.push("/")}>
                Play Now
            </div>
        </div>
    )
}

export default withRouter(Header);
