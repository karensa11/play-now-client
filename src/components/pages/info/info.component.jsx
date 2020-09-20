import React from "react";
import "./info.styles.scss";
import {Switch, Route} from "react-router-dom";
import About from "../about/about.component";
import Contact from "../contact/contact.component";
import LayoutWithHeaderCategoriesFooter
    from "../../layout/layout-with-header-categories-footer/layout-with-header-categories-footer.component";
import Terms from "../terms/terms.component";

export default function Info({match}) {
    return (
        <LayoutWithHeaderCategoriesFooter>
            <div className="info-page">
                <Switch>
                    <Route exact path={match.path + "/about"} component={About} />
                    <Route exact path={match.path + "/contact"} component={Contact} />
                    <Route exact path={match.path + "/terms"} component={Terms} />
                </Switch>
            </div>
        </LayoutWithHeaderCategoriesFooter>
    )
}
