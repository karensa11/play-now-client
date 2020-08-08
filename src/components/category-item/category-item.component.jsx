import React from "react";
import "./category-item.styles.scss";

export default function CategoryItem({category, itemSize}) {
    const itemWidth = itemSize - 25;
    return (
        <div className="category-item-component" style={{width: `${itemWidth}px`}}>
            <img src={category.imageUrl} alt="category display" />
            <div className="name">{category.displayName}</div>
        </div>
    )
}
