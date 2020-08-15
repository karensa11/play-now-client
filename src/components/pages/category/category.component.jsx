import React from "react";
import "./category.styles.scss";
import {Switch, Route} from "react-router-dom";
import CategoryOverview from "../../category/category-overview/category-overview.component";
import AllCategories from "../../category/all-categories/all-categories.component";

export default function Category({match}) {
    return (
        <div className="category-page">
            <Switch>
                <Route exact path={`${match.path}/all`} component={AllCategories} />
                <Route exact path={`${match.path}/:id`} component={CategoryOverview} />
            </Switch>
        </div>
    )
}
