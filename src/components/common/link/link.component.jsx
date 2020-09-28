import React from "react";
import "./link.styles.scss";

export default function Link({customClass, children, ...otherProps}) {
    return (
        <a className={`link-component ${customClass}`} {...otherProps}>
            {children}
        </a>
    )
}