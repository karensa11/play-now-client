import React, {useEffect} from "react";
import "./terms.styles.scss";
import ReactMarkdown from "react-markdown";
import termsContent from "../../../assets/txt/terms.MD.js";
import {setTitle} from "../../../util/utils";

export default function Terms() {
    useEffect(() => {
        setTitle("Terms And Conditions");
    });
    return (
        <div className="terms-component">
            <ReactMarkdown source={termsContent} />
        </div>
    )
}
