import React, {Component, useEffect} from "react";
import "./contact.styles.scss";
import CustomButton from "../common/custom-button/custom-button.component";
import {setTitle} from "../../util/utils";
import emailjs from 'emailjs-com';
const nodemailer = require('nodemailer');

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
                    <div className="title">
                        Email:&nbsp;<span className="mandatory">*</span>
                    </div>
                    <input value={this.state.from_email} className="input-field" type="text" size="100"
                           name="from_email"
                           onChange={this.setField} />
                    <div className="title">
                        Message:&nbsp;<span className="mandatory">*</span>
                    </div>
                    <textarea value={this.state.html_message} className="input-field" rows="4" cols="100"
                              name="html_message"
                              onChange={this.setField} />
                    <div className="submit">
                        <CustomButton onClick={this.onSubmit}>Submit</CustomButton>
                    </div>
                </form>
            </div>
        )
    }
}
