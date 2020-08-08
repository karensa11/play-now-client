import React from "react";
import "./categories-stripe.styles.scss";
import categories from "../../../data/categories";
import CategoryItem from "../category-item/category-item.component";
import ItemsStripe from "../../common/items-stripe/items-stripe.component";

const ITEM_SIZE = 300;

export default function CategoriesStripe() {
    return (
        <ItemsStripe
            items={categories}
            itemSize={ITEM_SIZE}
            itemRenderer={(category) => (
                <CategoryItem category={category} itemSize={ITEM_SIZE - 25} />
                )}
        />
    )
}

