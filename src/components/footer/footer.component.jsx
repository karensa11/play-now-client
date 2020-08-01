import React from "react";
import "./footer.styles.scss";
import {Link} from "react-router-dom";

export default function Footer() {
    const year = new Date().getFullYear();
    return (
        <div className="footer-component">
            <div className="copyright">@Copyright&nbsp;&nbsp;{year}&nbsp;&nbsp;Karen Samoila</div>
            <div className="links">
                <Link to="/info/about">About</Link>
                <div className="space">|</div>
                <Link to="/info/contact">Contact Us</Link>
                <div className="space">|</div>
                <Link to="/info/terms">Terms Of Use</Link>
            </div>
        </div>
    )
}
