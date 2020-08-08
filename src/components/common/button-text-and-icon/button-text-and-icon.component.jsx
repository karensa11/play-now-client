import React from "react";
import "./button-text-and-icon.styles.scss";

export default function ButtonTextAndIcon({text, iconImage, ...otherProps}) {
    return (
        <div className="button-text-and-icon-component" {...otherProps}>
            {text}&nbsp;&nbsp;
            <img src={iconImage} alt={text} />
        </div>
    )
}
