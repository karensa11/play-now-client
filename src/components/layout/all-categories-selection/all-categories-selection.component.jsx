import React from "react";
import "./all-categories-selection.styles.scss";
import {connect} from "react-redux";
import {createStructuredSelector} from "reselect";
import {categoriesNumByDozeSelector} from "../../../redux/categories-and-games/categories-and-games-selector";
import {withRouter} from "react-router-dom";

function AllCategoriesSelection({categoriesNumByDozen, history}) {
    const navigateToAllCategories = () => {
        history.push("/category/all");
    };
    return (
        <div className="all-categories-selection-component" onClick={navigateToAllCategories}>
            <h3>More</h3>
            <h4>{categoriesNumByDozen}+ Categories</h4>
        </div>
    )
}

const mapStateToProps = createStructuredSelector({
    categoriesNumByDozen: categoriesNumByDozeSelector
});

export default withRouter(connect(mapStateToProps)(AllCategoriesSelection));
