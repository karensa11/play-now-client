import React, {Component} from "react";
import "./search-results.styles.scss";
import {connect} from "react-redux";
import {gamesBySearchTextSelector} from "../../../redux/categories-and-games/categories-and-games-selector";
import {extractQueryParam} from "../../../util/navigationUtils";
import LayoutWithHeader from "../../layout/layout-with-header/layout-with-header.component";
import SearchItem from "../../search-item/search-item.component";
import like from "../../../assets/like2.png";
import {calculateItemsToDisplay, Pagination} from "../../common/pagination/pagination.component";

const BULK_SIZE = 10;

class SearchPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            paginationInfo: null
        };
    }

    setPaginationInfo = (paginationInfo) => {
        this.setState({paginationInfo: paginationInfo});
    };

    render()
    {
        const {paginationInfo} = this.state;
        const {searchItems, location} = this.props;
        const searchText = extractQueryParam(location, "searchText");
        const {bulkStart, bulkEnd} = (paginationInfo || {});
        const resultsCountEnd = bulkEnd > searchItems.length ? searchItems.length : bulkEnd;
        const itemsToDisplay = searchItems ? calculateItemsToDisplay(searchItems, bulkStart, bulkEnd) : [];
        return (
            <LayoutWithHeader>
                <div className="search-page">
                    <div className="search-page_header">
                        <div className="results-header">
                            <div className="results-count">
                                We found {searchItems.length} results for "{searchText}"
                            </div>
                            {paginationInfo &&
                                <div>
                                    Showing results {bulkStart + 1} - {resultsCountEnd} of {searchItems.length}
                                </div>
                            }
                        </div>
                        <Pagination
                            items={searchItems}
                            bulkSize={BULK_SIZE}
                            setPaginationInfo={this.setPaginationInfo}
                            />
                    </div>
                    <div className="table">
                        <div className="table-header">
                            <div className="details">&nbsp;</div>
                            <div className="count">PLAY COUNT</div>
                            <div className="count">DATE ADDED</div>
                            <div className="likes">
                                <img src={like} alt="likes amount"/>
                            </div>
                        </div>
                        {itemsToDisplay.map((searchItem, index) => {
                            return (
                                <SearchItem key={searchItem.id}
                                            gameData={searchItem}
                                            index={index}
                                />
                            )
                        })}
                    </div>
                </div>
            </LayoutWithHeader>
        )
    }
}

const mapStateToProps = (state, ownProps) => ({
    searchItems: gamesBySearchTextSelector(
        extractQueryParam(ownProps.location, "searchText"))(state)
});

export default connect(mapStateToProps)(SearchPage);
