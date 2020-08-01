import React from "react";
import "./category-item.styles.scss";

export default function CategoryItem({category, itemSize}) {
    return (
        <div key={category.code} className="category-item" style={{width: `${itemSize-25}px`}}>
            <img src={category.imageUrl} alt="category image"/>
            <div className="name">{category.displayName}</div>
        </div>
    )
}
