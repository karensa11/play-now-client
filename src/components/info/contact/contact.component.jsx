import React, {Component} from "react";
import "./contact.styles.scss";
import CustomButton from "../../common/custom-button/custom-button.component";
import {setTitle} from "../../../util/utils";
import FormInput from "../../common/form-input/form-input.component";
import TextAreaInput from "../../common/text-area/text-area.component";

export default class Contact extends Component
{
    constructor(props) {
        super(props);
        this.state = {
            from_email: "",
            html_message: ""
        };
    }
    componentDidMount() {
        setTitle("Contact");
    }
    setField = (event) => {
        const {name, value} = event.target;
        this.setState({[name]: value});
    };
    sendEmail = (event) => {
        event.preventDefault();
        // TODO - not working //
        console.log(this.state);
        const options = {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                to: this.state.from_email,
                message: this.state.html_message
            })
        };
        console.log("options");
        console.log(options);
        const url = "http://localhost:5600/sendContactEmail";
        fetch(url, options);
    };
    render() {
        return (
            <div className="contact-component">
                <form onSubmit={this.sendEmail}>
                    <h1>Contact Us</h1>
                    <FormInput
                        label="Email"
                        required
                        value={this.state.from_email}
                        type="text"
                        size="100"
                        name="from_email"
                        handleChange={this.setField}
                    />
                    <TextAreaInput
                        label="Message"
                        required
                        value={this.state.html_message}
                        rows="4" cols="100"
                        name="html_message"
                        handleChange={this.setField}
                    />
                    <div className="submit">
                        <CustomButton onClick={this.onSubmit}>Submit</CustomButton>
                    </div>
                </form>
            </div>
        )
    }
}
