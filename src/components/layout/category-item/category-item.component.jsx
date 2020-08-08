import React from "react";
import "./category-item.styles.scss";
import {withRouter} from "react-router-dom";
import {navigateToAndRefresh} from "../../../util/utils";

function CategoryItem({category, itemSize, history}) {
    const itemWidth = itemSize - 25;
    const {id, imageUrl, displayName} = category;
    const navigateToCategory = () => {
        navigateToAndRefresh(history, `/category/${id}`);
       // history.push(`/category/${id}`); TODO
    };
    return (
        <div className="category-item-component" style={{width: `${itemWidth}px`}}
            onClick={navigateToCategory}>
            <img src={imageUrl} alt="category display" />
            <div className="name">{displayName}</div>
        </div>
    )
}

export default withRouter(CategoryItem);
