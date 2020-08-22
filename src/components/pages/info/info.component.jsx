import React from "react";
import "./info.styles.scss";
import {Switch, Route} from "react-router-dom";
import About from "../../info/about/about.component";
import Contact from "../../info/contact/contact.component";
import LayoutWithHeaderCategoriesFooter
    from "../../layout/layout-with-header-categories-footer/layout-with-header-categories-footer.component";

export default function Info({match}) {
    return (
        <LayoutWithHeaderCategoriesFooter>
            <div className="info-page">
                <Switch>
                    <Route exact path={match.path + "/about"} component={About} />
                    <Route exact path={match.path + "/contact"} component={Contact} />
                </Switch>
            </div>
        </LayoutWithHeaderCategoriesFooter>
    )
}
