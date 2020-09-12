import React, {Component} from "react";
import "./register.styles.scss";
import FormInput, {INPUT_TYPES} from "../../common/form-input/form-input.component";
import {auth} from "../../../util/firebase/firebase";
import {connect} from "react-redux";
import {
    checkUserExistsByMail,
    checkUserExistsByUsername,
    createUserProfileDocument
} from "../../../util/firebase/firebaseAuthenticationAndUsers";
import {setTitle} from "../../../util/utils";
import PasswordConfirm from "../../common/password-confirm/password-confirm-input.component";
import CustomButton from "../../common/custom-button/custom-button.component";
import {eitherStringIsEmpty, objectNotEmpty} from "../../../util/objectUtils";
import {logError} from "../../../util/logger";

class Register extends Component{
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            username: "",
            password: "",
            confPassword: "",
            invalidValues: {},
            emailValidationMessage: null,
            usernameValidationMessage: null,
            forceValidate: false
        };
    }
    componentDidMount() {
        setTitle("Register");
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.state.forceValidate){
            this.setState({forceValidate: false});
        }
    }

    handleChange = (name, value, isValid) => {
        const invalidValues = {...this.state.invalidValues};
        invalidValues[name] = !isValid;
        const emailValidationMessage = name === INPUT_TYPES.EMAIL ? null : this.state.emailValidationMessage;
        const usernameValidationMessage = name === INPUT_TYPES.USERNAME ? null : this.state.usernameValidationMessage;
        this.setState({[name]: value, invalidValues: invalidValues,
            emailValidationMessage: emailValidationMessage, usernameValidationMessage: usernameValidationMessage});
    };
    handleSubmit = async (event) => {
        event.preventDefault();
        const {email, username, password, invalidValues} = this.state;
        if(objectNotEmpty(invalidValues)){
            return;
        }
        if(eitherStringIsEmpty([email, password])){
            this.setState({forceValidate: true});
            return;
        }
        const emailExists = await checkUserExistsByMail(email);
        const usernameExists = await checkUserExistsByUsername(username);
        const emailValidationMessage = emailExists ? "email already exists" : null;
        const usernameValidationMessage = usernameExists ? "username already exists" : null;
        if (emailExists || usernameExists) {
            this.setState({emailValidationMessage: emailValidationMessage,
                usernameValidationMessage: usernameValidationMessage});
            return;
        }
        try {
            const {user} = await auth.createUserWithEmailAndPassword(email, password);
            const userData = {uid: user.uid, email: user.email, username: username, isInternal: true};
            await createUserProfileDocument(userData);
        } catch (err) {
            logError("submit register", err);
        }
    };
    render() {
        const {email, username, emailValidationMessage, usernameValidationMessage, forceValidate} = this.state;
        return (
            <div className="register-component">
                <form>
                    <FormInput
                        name="username"
                        label="Username"
                        type={INPUT_TYPES.USERNAME}
                        required
                        handleChange={this.handleChange}
                        value={username}
                        validationMessage={usernameValidationMessage}
                        forceValidate={forceValidate}
                    />
                    <FormInput
                        name="email"
                        label="Email"
                        type={INPUT_TYPES.EMAIL}
                        required
                        handleChange={this.handleChange}
                        value={email}
                        validationMessage={emailValidationMessage}
                        forceValidate={forceValidate}
                    />
                    <PasswordConfirm
                        name="password"
                        required
                        handleChange={this.handleChange}
                        forceValidate={forceValidate}
                    />
                    <div className="buttons">
                        <CustomButton onClick={this.handleSubmit}>
                            Create
                        </CustomButton>
                    </div>
                </form>
            </div>
        )
    }
}

export default connect()(Register);
