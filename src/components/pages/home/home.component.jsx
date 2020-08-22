import React, {useEffect} from "react";
import "./home.styles.scss";
import {setTitle} from "../../../util/utils";
import LayoutWithHeaderCategoriesFooter
    from "../../layout/layout-with-header-categories-footer/layout-with-header-categories-footer.component";

export default function Home() {
    useEffect(() => {
        setTitle("");
    });
    return (
        <LayoutWithHeaderCategoriesFooter>
            <div className="home-page">
                HOME
            </div>
        </LayoutWithHeaderCategoriesFooter>
    )
}
