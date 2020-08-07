import React, {Component} from "react";
import "./form-input.styles.scss";
import viewIcon from "../../../assets/view.png";
import hideIcon from "../../../assets/hide.png";
import {validateEmail, validatePassword} from "../../../util/validators";
import {stringNotEmpty} from "../../../util/objectUtils";

export const INPUT_TYPES = {
    PASSWORD: "password",
    EMAIL: "email"
};

export default class FormInput extends Component
{
    constructor(props) {
        super(props);
        this.state = {
            passwordHidden: true,
            internalValidationMessage: null,
            value: null
        }
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        const {name, forceValidate} = this.props;
        const {value} = this.state;
        if(forceValidate) {
            const isValid = this.validate(value);
            this.props.handleChange(name, value, isValid);
        }
    }

    showPassword = () => {
        this.setState({passwordHidden: false});
    };
    hidePassword = () => {
        this.setState({passwordHidden: true});
    };

    handleChange = (event) => {
        const {name, value} = event.target;
        const isValid = this.validate(value);
        this.props.handleChange(name, value, isValid);
        this.setState({value: value});
    };

    validate = (value) => {
        const {required, label, type} = this.props;
        let internalValidationMessage = null;
        if(required && !stringNotEmpty(value)) {
            internalValidationMessage = `${label} is required`;
        }
        else {
            switch (type) {
                case INPUT_TYPES.PASSWORD: {
                    const validationResult = validatePassword(value);
                    internalValidationMessage = !validationResult && "password should contain 6-8 ABC/abc characters";
                } break;
                case INPUT_TYPES.EMAIL: {
                    const validationResult = validateEmail(value);
                    internalValidationMessage = !validationResult && "invalid email";
                } break;
                default: break;
            }
        }
        this.setState({internalValidationMessage: internalValidationMessage});
        return (typeof internalValidationMessage !== "undefined");
    };

    render() {
        const {type, validationMessage} = this.props;
        const {passwordHidden, internalValidationMessage} = this.state;
        const otherProps = {...this.props};
        const message = internalValidationMessage || validationMessage;
        delete otherProps.type;
        delete otherProps.handleChange;
        delete otherProps.validationMessage;
        delete otherProps.forceValidate;
        const inputType = type === INPUT_TYPES.PASSWORD && this.state.passwordHidden ?
            "password" : "text";
        const inputClassName =
            `
            ${type} 
            ${passwordHidden ? "hidden":""} 
            ${message ? "invalid":""} 
            form-input`;
        return (
            <div className="form-input-group-component">
                <div className="title">
                    <div>{this.props.label}</div>
                    {this.props.required &&
                        <div>
                            &nbsp;<span className="mandatory">*</span>
                        </div>
                    }
                </div>
                <div>
                    <input  className={inputClassName}
                            type={inputType}
                            onChange={this.handleChange} {...otherProps}
                            autoComplete="current-password"
                    />
                    {type === INPUT_TYPES.PASSWORD &&
                        <span>
                            &nbsp;&nbsp;
                            {this.state.passwordHidden ?
                                <img src={hideIcon} alt="" width="25" height="25" onClick={this.showPassword}/>
                                :
                                <img src={viewIcon} alt="" width="25" height="25" onClick={this.hidePassword}/>
                            }
                        </span>

                    }
                </div>
                {message &&
                    <div className="notification">
                        {message}
                    </div>
                }
            </div>
        )
    }
}
