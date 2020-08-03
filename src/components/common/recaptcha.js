import ReCAPTCHA from "react-google-recaptcha/src/recaptcha";
import {firebaseConfig} from "../../util/firebase";
import React from "react";

export default function ReCaptha() {
    return (
        <ReCAPTCHA sitekey={firebaseConfig.apiKey}/>
    )
}
