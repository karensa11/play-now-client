import React, {useEffect} from "react";
import "./about.styles.scss";
import ReactMarkdown from "react-markdown";
import aboutContent from "../../assets/about.MD.js";
import {setTitle} from "../../util/utils";

export default function About() {
    useEffect(() => {
        setTitle("About");
    });
    return (
        <div className="about-component">
            <ReactMarkdown source={aboutContent} />
        </div>
    )
}
