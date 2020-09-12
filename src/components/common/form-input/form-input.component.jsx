import React, {Component} from "react";
import "./form-input.styles.scss";
import viewIcon from "../../../assets/view.png";
import hideIcon from "../../../assets/hide.png";
import {stringNotEmpty} from "../../../util/objectUtils";
import {validateValueWithRegex} from "../../../util/utils";
import {INPUT_TYPES_DATA, _INPUT_TYPES} from "../../../util/data/input-types";

export const INPUT_TYPES = _INPUT_TYPES;

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
            const inputType = INPUT_TYPES_DATA[type];
            if (inputType) {
                const validationResult = validateValueWithRegex(inputType.validatorExpression, value);
                internalValidationMessage = !validationResult && inputType.validationMessage;
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
            form-input-group-component_${type} 
            ${passwordHidden ? "hidden" : ""} 
            ${message ? "invalid" : ""} 
            form-input-group-component_form-input`;
        return (
            <div className="form-input-group-component">
                <div className="form-input-group-component_title">
                    <div>{this.props.label}</div>
                    {this.props.required &&
                        <div>
                            &nbsp;<span className="form-input-group-component_title-mandatory">*</span>
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
                    <div className="form-input-group-component_notification">
                        {message}
                    </div>
                }
            </div>
        )
    }
}
