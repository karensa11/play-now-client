import React, {Component} from "react";
import "./register.styles.scss";
import FormInput from "../../common/form-input/form-input.component";
import CustomButton from "../../common/custom-button/custom-button.component";
import {auth, checkUserExistsByMail, createUserProfileDocument} from "../../../util/firebase";
import {validateNotEmpty, validateStringsAreSame, validateEmail, validatePassword} from "../../../util/validators";
import {setTitle} from "../../../util/utils";

export default class Register extends Component{
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            confirmPassword: "",
            notifications: {}
        };
    }
    componentDidMount() {
        setTitle("Register");
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
        const {confirmPassword} = this.state;
        const newNotifications = {...this.state.notifications};
        let message = (validateNotEmpty(password) ? null : "password cannot be empty");
        message = message || (validatePassword(password) ? null : "password should contain 6-8 ABC/abc characters");
        message = message || (validateStringsAreSame(password, confirmPassword) ? null : "passwords must match");
        newNotifications.password = message;
        if (newNotifications.password === "passwords must match" &&
            message !== "passwords must match")  {
            newNotifications.password = null;
        }
        this.setState({notifications: newNotifications});
    };
    confirmPasswordValidator = (confirmPassword) => {
        const {password} = this.state;
        const newNotifications = {...this.state.notifications};
        let message = (validateNotEmpty(password) ? null : "confirm password cannot be empty");
        message = message || (validateStringsAreSame(password, confirmPassword) ? null : "passwords must match");
        newNotifications.confirmPassword = message;
        if (newNotifications.password === "passwords must match" &&
            message !== "passwords must match")  {
            newNotifications.password = null;
        }
        this.setState({notifications: newNotifications});
    };
    handleSubmit = async (event) => {
        event.preventDefault();
        console.log(this.state);
        const {email, password, notifications} = this.state;
        Object.keys(notifications).forEach((key) => {
            if(notifications[key]){
                return;
            }
        });
        const emailExists = await checkUserExistsByMail(email);
        if(emailExists) {
            const newNotifications = {...notifications};
            newNotifications.email = "email already exists";
            this.setState({notifications: newNotifications});
            return;
        }
        try {
            const {user} = await auth.createUserWithEmailAndPassword(email, password);
            const userData = {uid: user.uid, email: user.email, displayName: "User"};
            await createUserProfileDocument(userData);
        } catch (err) {
            console.log("could not sign in "+err.message);
        }
    };
    render() {
        const {email, password, confirmPassword, notifications} = this.state;
        console.log(this.state);
        return (
            <div className="register-component">
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
                <FormInput
                    name="confirmPassword"
                    type="password"
                    label="Confirm Password"
                    required
                    handleChange={this.setField}
                    value={confirmPassword}
                    validator={this.confirmPasswordValidator}
                    notifications={notifications}
                />
                <div className="buttons">
                    <CustomButton onClick={this.handleSubmit}>
                        Submit
                    </CustomButton>
                </div>
            </div>
        )
    }
}
