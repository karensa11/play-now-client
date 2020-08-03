import React from "react";
import "./text-area.styles.scss";

export default function TextAreaInput({handleChange, label, required, ...otherProps}) {
    return (
        <div className="form-area-group-component">
            <div className="title">
                {label}
                {required &&
                    <span>
                        &nbsp;<span className="mandatory">*</span>
                    </span>
                }
            </div>
            <textarea   className="form-area"
                        {...otherProps}
                        onChange={handleChange} />
        </div>
    )
}
