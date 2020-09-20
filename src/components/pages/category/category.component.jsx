import React from "react";
import "./category.styles.scss";
import {Switch, Route} from "react-router-dom";
import CategoryOverview from "../category-overview/category-overview.component";
import AllCategories from "../all-categories/all-categories.component";
import LayoutWithHeaderCategoriesFooter
    from "../../layout/layout-with-header-categories-footer/layout-with-header-categories-footer.component";

export default function Category({match}) {
    return (
        <LayoutWithHeaderCategoriesFooter>
            <div className="category-page">
                <Switch>
                    <Route exact path={`${match.path}/all`} component={AllCategories} />
                    <Route exact path={`${match.path}/:id`} component={CategoryOverview} />
                </Switch>
            </div>
        </LayoutWithHeaderCategoriesFooter>
    )
}
