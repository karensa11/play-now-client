import React, {Component} from "react";
import "./login.styles.scss";
import FormInput from "../../common/form-input/form-input.component";
import CustomButton from "../../common/custom-button/custom-button.component";
import {auth, signInWithGoogle} from "../../../util/firebase";
import {validateEmail, validateNotEmpty} from "../../../util/validators";
import {setTitle} from "../../../util/utils";

export default class Login extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            email: "",
            password: "",
            notifiactions: {}
        }
    }
    componentDidMount() {
        setTitle("Login");
    }

    setField = (event) => {
        const {name, value} = event.target;
        this.setState({[name]: value});
    };
    emailValidator = (email) => {
        const newNotifications = {...this.state.notifications};
        let message = (validateNotEmpty(email) ? null : "email cannot be empty");
        message = message || (validateEmail(email) ? null : "email is invalid");
        newNotifications.email = message;
        this.setState({notifications: newNotifications});
    };
    passwordValidator = (password) => {
        const newNotifications = {...this.state.notifications};
        let message = (validateNotEmpty(password) ? null : "password cannot be empty");
        newNotifications.password = message;
        this.setState({notifications: newNotifications});
    };
    handleSubmit = async (event) => {
        event.preventDefault();
        const {email, password} = this.state;
        try {
            await auth.signInWithEmailAndPassword(email, password);
        } catch (err) {
            if(err.message.includes("no user record") || err.message.includes("The password is invalid")) {
                alert("email or password is wrong");
            }
        }
    };
    render() {
        const {email, password, notifications} = this.state;
        return (
            <div className="login-component">
                <div className="login-component-container">
                    <FormInput
                        name="email"
                        label="Email"
                        required
                        handleChange={this.setField}
                        value={email}
                        validator={this.emailValidator}
                        notifications={notifications}
                    />
                    <FormInput
                        name="password"
                        type="password"
                        label="Password"
                        required
                        handleChange={this.setField}
                        value={password}
                        validator={this.passwordValidator}
                        notifications={notifications}
                    />
                    <div className="buttons">
                        <CustomButton onClick={this.handleSubmit}>
                            Login
                        </CustomButton>
                        <CustomButton
                            isSignInWithGoogle
                            inverted
                            onClick={signInWithGoogle}>
                            Login With Gmail
                        </CustomButton>
                    </div>
                </div>
            </div>
        )
    }
}
