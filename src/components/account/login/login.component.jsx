import React, {Component} from "react";
import "./login.styles.scss";
import FormInput, {INPUT_TYPES} from "../../common/form-input/form-input.component";
import CustomButton from "../../common/custom-button/custom-button.component";
import {auth, signInWithFacebook, signInWithGoogle} from "../../../util/firebase";
import {setTitle} from "../../../util/utils";
import {eitherStringIsEmpty, objectNotEmpty} from "../../../util/objectUtils";
import ButtonTextAndIcon from "../../common/button-text-and-icon/button-text-and-icon.component";
import googleIcon from "../../../assets/site-icons/gmail.png";
import facebookIcon from "../../../assets/site-icons/facebook.jpg";

export default class Login extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            email: "",
            password: "",
            invalidValues: {},
            forceValidate: false
        }
    }
    componentDidMount() {
        setTitle("Login");
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.state.forceValidate){
            this.setState({forceValidate: false});
        }
    }

    handleChange = (name, value, isValid) => {
        const invalidValues = {...this.state.invalidValues};
        invalidValues[name] = !isValid;
        this.setState({[name]: value, invalidValues: invalidValues});
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
        try {
            await auth.signInWithEmailAndPassword(email, password);
        } catch (err) {
            if(err.message.includes("no user record") || err.message.includes("The password is invalid")) {
                alert("email or password is wrong");
            }
        }
    };
    render() {
        const {email, password, forceValidate} = this.state;
        return (
            <div className="login-component">
                <div className="login-component-container">
                    <form>
                        <FormInput
                            name="email"
                            label="Email"
                            type={INPUT_TYPES.EMAIL}
                            required
                            handleChange={this.handleChange}
                            value={email}
                            forceValidate={forceValidate}
                        />
                        <FormInput
                            name="password"
                            type={INPUT_TYPES.PASSWORD}
                            label="Password"
                            required
                            handleChange={this.handleChange}
                            value={password}
                            forceValidate={forceValidate}
                        />
                        <div className="buttons">
                            <CustomButton onClick={this.handleSubmit}>
                                Login
                            </CustomButton>
                            <div className="right">
                                <ButtonTextAndIcon
                                    text="login with facebook"
                                    iconImage={facebookIcon}
                                    onClick={signInWithFacebook} />
                                <ButtonTextAndIcon
                                    text="login with gmail"
                                    iconImage={googleIcon}
                                    onClick={signInWithGoogle} />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}
