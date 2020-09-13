import React, {Component} from "react";
import  "./search-page.styles.scss";
import {connect} from "react-redux";
import {gamesBySearchTextSelector} from "../../../redux/categories-and-games/categories-and-games-selector";
import {extractQueryParam} from "../../../util/navigationUtils";
import LayoutWithHeader from "../../layout/layout-with-header/layout-with-header.component";
import SearchItem from "../../search/search-item/search-item.component";
import like from "../../../assets/like2.png";
import {createIndexArr} from "../../../util/objectUtils";
import memoize from "memoize-one";

const BULK_SIZE = 10;

class SearchPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentBulk: 1,
            initialized: false
        };
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        const {searchItems} = this.props;
        const {initialized} = this.state;
        if (searchItems && !initialized) {
            this.bulksNumber = searchItems.length === BULK_SIZE ?
                1 : Math.floor(searchItems.length / BULK_SIZE) + 1;
            this.bulksArr = createIndexArr(1, this.bulksNumber + 1);
            this.setState({initialized: true});
        }
    }

    paginatePrevious = (event) => {
        event.preventDefault();
        const {currentBulk} = this.state;
        this.setCurrentBulk(currentBulk - 1);
    };

    paginateNext = (event) => {
        event.preventDefault();
        const {currentBulk} = this.state;
        this.setCurrentBulk(currentBulk + 1);
    };

    setCurrentBulk = (currentBulk) => {
        this.setState({currentBulk: currentBulk});
    };
    setCurrentBulkBtn = (event) => {
        event.preventDefault();
        const {value} = event.target;
        this.setCurrentBulk(+value);
    };

    calculateItemsToDisplay = memoize((searchItems, bulkStart, bulkEnd) => {
        return (searchItems || []).filter((value, index) => (index >= bulkStart && index < bulkEnd))
    });

    render()
    {
        const {currentBulk} = this.state;
        const {bulksNumber, bulksArr} = this;
        const {searchItems, location} = this.props;
        const searchText = extractQueryParam(location, "searchText");
        const bulkStart = BULK_SIZE * (currentBulk - 1);
        const bulkEnd = BULK_SIZE * (currentBulk);
        const itemsToDisplay =
             searchItems ? this.calculateItemsToDisplay(searchItems, bulkStart, bulkEnd) : [];
        return (
            <LayoutWithHeader>
                <div className="search-page">
                    <div className="search-page_header">
                        <div className="results-header">
                            <div className="results-count">
                                We found {searchItems.length} results for "{searchText}"
                            </div>
                            {bulksArr &&
                                <div>
                                    Showing results {bulkStart + 1} - {bulkEnd} of {searchItems.length}
                                </div>
                            }
                        </div>
                        {bulksArr &&
                            <div className="search-page_pagination">
                                {currentBulk > 1 &&
                                    <button onClick={this.paginatePrevious}>&lsaquo; Previous</button>
                                }
                                {bulksArr.map(number => (
                                    <button key={number} className={`${number === currentBulk ? "selected" : ""}`}
                                            value={number} onClick={this.setCurrentBulkBtn}>
                                        {number}
                                    </button>
                                ))}
                                {currentBulk < bulksNumber &&
                                    <button onClick={this.paginateNext}>Next &rsaquo;</button>
                                }
                            </div>
                        }
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
