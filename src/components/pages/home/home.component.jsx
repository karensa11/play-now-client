import React, {useEffect} from "react";
import "./home.styles.scss";
import {setTitle} from "../../../util/utils";

export default function Home() {
    useEffect(() => {
        setTitle("");
    });
    return (
        <div className="home-page">
            HOME
        </div>
    )
}