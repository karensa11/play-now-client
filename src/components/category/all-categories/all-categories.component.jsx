import React, {useEffect} from "react";
import "./all-categories.styles.scss";
import ItemsTable from "../../common/items-table/items-table.component";
import CategoryItem from "../../layout/category-item/category-item.component";
import {createStructuredSelector} from "reselect";
import {allCategoriesSelector} from "../../../redux/categories-and-games/categories-and-games-selector";
import {connect} from "react-redux";
import {setTitle} from "../../../util/utils";

const ITEM_SIZE = 300;

function AllCategories({categories}) {
    useEffect(() => {
        setTitle("Categories");
    });
    return (
        <div className="all-categories-component">
            <ItemsTable
                items={categories}
                bulkSize={10}
                itemRenderer={(category) =>
                    <CategoryItem category={category} itemSize={ITEM_SIZE} />
                }
                />
        </div>
    )
}

const mapStateToProps = createStructuredSelector({
    categories: allCategoriesSelector
});

export default connect(mapStateToProps)(AllCategories);
