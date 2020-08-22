import React from "react";
import "./layout-with-header.styles.scss";
import Header from "../header/header.component";

export default function LayoutWithHeader({children}) {
    return (
        <div className="layout-with-header-component">
            <Header/>
            <div className="main-section">
                {children}
            </div>
        </div>
    )
}
