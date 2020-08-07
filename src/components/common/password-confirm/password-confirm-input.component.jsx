import React, {Component} from "react";
import "./password-confirm-input.styles.scss";
import FormInput, {INPUT_TYPES} from "../form-input/form-input.component";

export default class PasswordConfirm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            password: "",
            confPassword: "",
            validationMessage: null
        };
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        this.props.resetPassword && this.setState({password: "", confPassword: ""});
    }

    passwordAndConfPassword = (value, isConfPassword) => {
        const {confPassword, password} = this.state;
        const passwordUpdated = isConfPassword ? password : value;
        const confPasswordUpdated = isConfPassword ? value : confPassword;
        return passwordUpdated === confPasswordUpdated;
    };
    handleChange = (name, value, isValid) => {
        let validationMessage = null;
        if(isValid && !this.passwordAndConfPassword(value, name === "confPassword")) {
            validationMessage = "password does not match";
        }
        this.setState({[name]: value, validationMessage: validationMessage});
        this.props.handleChange(this.props.name, value, isValid && !validationMessage);
    };
    render() {
        const {password, confPassword, validationMessage} = this.state;
        const {forceValidate, required} = this.props;
        return (
            <div className="password-confirm-input-component">
                <FormInput
                    name="password"
                    label="Password"
                    type={INPUT_TYPES.PASSWORD}
                    required={required}
                    handleChange={this.handleChange}
                    value={password}
                    validationMessage={validationMessage}
                    forceValidate={forceValidate}
                />
                <FormInput
                    name="confPassword"
                    label="Confirm Password"
                    type={INPUT_TYPES.PASSWORD}
                    required={required}
                    handleChange={this.handleChange}
                    value={confPassword}
                    validationMessage={validationMessage}
                    forceValidate={forceValidate}
                />
            </div>
        )
    }
}
