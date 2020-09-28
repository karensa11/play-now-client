import React, {Component} from "react";
import "./contact.styles.scss";
import CustomButton from "../../common/custom-button/custom-button.component";
import {setTitle} from "../../../util/utils";
import FormInput from "../../common/form-input/form-input.component";
import TextAreaInput from "../../common/text-area/text-area.component";
import {sendContactEmail} from "../../../util/beServerUtils";

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
    setField = (name, value) => {
        this.setState({[name]: value});
    };
    sendEmail = async (event) => {
        event.preventDefault();
        const {from_email, html_message} = this.state;
        try {
            await sendContactEmail(from_email, html_message);
            alert("Your message received success");
        } catch (err) {
            alert("Failed to save message");
        }
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
