import React from "react";
import "./custom-button.styles.scss";

export default function CustomButton({children, ...otherProps})
{
    return (
        <button className="custom-button-component"
                {...otherProps}>
            {children}
        </button>
    )
}
