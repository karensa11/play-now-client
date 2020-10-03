import React from "react";
import "./category-item.styles.scss";
import {withRouter} from "react-router-dom";
import {navigateToCategory} from "../../util/navigationUtils";

function CategoryItem({category, itemSize, history, hideBoxShadow}) {
    const itemWidth = itemSize - 25;
    const {imageUrl, displayName} = category;
    const goToCategory = () => {
        navigateToCategory(history, category);
    };
    return (
        <div className="category-item-component" style={{
            width: `${itemWidth}px`,
            boxShadow: `${hideBoxShadow ? "none" : "inline"}`}}
            onClick={goToCategory}>
            <img src={imageUrl} alt="category display" />
            <div className="name">{displayName}</div>
        </div>
    )
}

export default withRouter(CategoryItem);
