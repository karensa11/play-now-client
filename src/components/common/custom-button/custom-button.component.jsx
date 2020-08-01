import React from "react";
import "./custom-button.styles.scss";

export default function CustomButton({children, isSignInWithGoogle, inverted, ...otherProps})
{
    return (
        <button className={`
                        ${inverted ? 'inverted' : ''}
                        ${isSignInWithGoogle ? 'sign-in-with-google' : ''} 
                        custom-button
                        `}
                {...otherProps}>
            {children}
        </button>
    )
}
