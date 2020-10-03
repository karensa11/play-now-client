import React from "react";
import "./all-categories-selection.styles.scss";
import {connect} from "react-redux";
import {createStructuredSelector} from "reselect";
import {categoriesNumByDozeSelector} from "../../../redux/categories-and-games/categories-and-games-selector";
import {withRouter} from "react-router-dom";
import {navigateToAllCategories} from "../../../util/navigationUtils";

function AllCategoriesSelection({categoriesNumByDozen, history}) {
    const goToAllCategories = () => {
        navigateToAllCategories(history);
    };
    return (
        <div className="all-categories-selection-component" onClick={goToAllCategories}>
            <h3>More</h3>
            <h4>{categoriesNumByDozen}+ Categories</h4>
        </div>
    )
}

const mapStateToProps = createStructuredSelector({
    categoriesNumByDozen: categoriesNumByDozeSelector
});

export default withRouter(connect(mapStateToProps)(AllCategoriesSelection));
