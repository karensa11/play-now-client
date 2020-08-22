import React, {Component} from "react";
import "./register.styles.scss";
import FormInput, {INPUT_TYPES} from "../../common/form-input/form-input.component";
import {auth} from "../../../util/firebase/firebase";
import {checkUserExistsByMail, createUserProfileDocument} from "../../../util/firebase/firebaseAuthenticationAndUsers";
import {setTitle} from "../../../util/utils";
import PasswordConfirm from "../../common/password-confirm/password-confirm-input.component";
import CustomButton from "../../common/custom-button/custom-button.component";
import {eitherStringIsEmpty, objectNotEmpty} from "../../../util/objectUtils";
import {logError} from "../../../util/logger";

export default class Register extends Component{
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            confPassword: "",
            invalidValues: {},
            emailValidationMessage: null,
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
        let emailValidationMessage = this.state.emailValidationMessage;
        if(name === INPUT_TYPES.EMAIL) {
            emailValidationMessage = null;
        }
        this.setState({[name]: value, invalidValues: invalidValues, emailValidationMessage: emailValidationMessage});
    };
    handleSubmit = async (event) => {
        event.preventDefault();
        const {email, password, invalidValues} = this.state;
        if(objectNotEmpty(invalidValues)){
            return;
        }
        if(eitherStringIsEmpty([email, password])){
            this.setState({forceValidate: true});
            return;
        }
        const emailExists = await checkUserExistsByMail(email);
        if(emailExists) {
            this.setState({emailValidationMessage: "email already exists"});
            return;
        }
        try {
            const {user} = await auth.createUserWithEmailAndPassword(email, password);
            const userData = {uid: user.uid, email: user.email, displayName: "User", isInternal: true};
            await createUserProfileDocument(userData);
        } catch (err) {
            logError("submit register", err);
        }
    };
    render() {
        const {email, emailValidationMessage, forceValidate} = this.state;
        return (
            <div className="register-component">
                <form>
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
