import React from "react";
import "./category-item.styles.scss";
import {withRouter} from "react-router-dom";
import {navigateToAndRefresh} from "../../util/utils";

function CategoryItem({category, itemSize, history, hideBoxShadow}) {
    const itemWidth = itemSize - 25;
    const {id, imageUrl, displayName} = category;
    const navigateToCategory = () => {
        navigateToAndRefresh(history, `/category/${id}`);
    };
    return (
        <div className="category-item-component" style={{
            width: `${itemWidth}px`,
            boxShadow: `${hideBoxShadow ? "none" : "inline"}`}}
            onClick={navigateToCategory}>
            <img src={imageUrl} alt="category display" />
            <div className="name">{displayName}</div>
        </div>
    )
}

export default withRouter(CategoryItem);
