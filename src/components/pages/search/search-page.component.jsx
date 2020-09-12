import React from "react";
import  "./search-page.styles.scss";
import {connect} from "react-redux";
import {gamesBySearchTextSelector} from "../../../redux/categories-and-games/categories-and-games-selector";
import {extractQueryParam} from "../../../util/navigationUtils";
import LayoutWithHeader from "../../layout/layout-with-header/layout-with-header.component";
import SearchItem from "../../search/search-item/search-item.component";
import like from "../../../assets/like2.png";

function SearchPage({searchItems, location}) {
    const searchText = extractQueryParam(location, "searchText");
    return (
        <LayoutWithHeader>
            <div className="search-page">
                <div className="results-count">
                    We found {searchItems.length} results for "{searchText}"
                </div>
                <div className="table-header">
                    <div className="details">&nbsp;</div>
                    <div className="count">PLAY COUNT</div>
                    <div className="count">DATE ADDED</div>
                    <div className="likes">
                        <img src={like} alt="likes amount" />
                    </div>
                </div>
                {searchItems.map((searchItem) => {
                    return (
                        <SearchItem key={searchItem.id}
                                    gameData={searchItem}
                        />
                    )
                })}
            </div>
        </LayoutWithHeader>
    )
}

const mapStateToProps = (state, ownProps) => ({
    searchItems: gamesBySearchTextSelector(
        extractQueryParam(ownProps.location, "searchText"))(state)
});

export default connect(mapStateToProps)(SearchPage);
