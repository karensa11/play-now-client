import React from "react";
import "./text-area.styles.scss";

export default function TextAreaInput({handleChange, label, required, ...otherProps}) {

    const onChange = (event) => {
        const {name, value} = event.target;
        handleChange(name, value);
    };
    return (
        <div className="form-area-group-component">
            <div className="form-area-group-component_title">
                {label}
                {required &&
                    <span>
                        &nbsp;<span className="mandatory">*</span>
                    </span>
                }
            </div>
            <textarea   className="form-area-group-component_form-area"
                        {...otherProps}
                        onChange={onChange} />
        </div>
    )
}
