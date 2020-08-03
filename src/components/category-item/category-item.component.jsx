import React from "react";
import "./category-item.styles.scss";

export default function CategoryItem({category, itemSize}) {
    return (
        <div className="category-item-component" style={{width: `${itemSize-25}px`}}>
            <img src={category.imageUrl} alt="category display" />
            <div className="name">{category.displayName}</div>
        </div>
    )
}
