import React, {Component} from "react";
import "./pagination.styles.scss";
import memoize from "memoize-one";
import {createIndexArr} from "../../../util/objectUtils";

export class PaginationInfo {
    constructor(bulkStart, bulkEnd) {
        this.bulkStart = bulkStart;
        this.bulkEnd = bulkEnd;
    }
}

export const calculateItemsToDisplay = memoize((items, bulkStart, bulkEnd) => {
    return items.filter((value, index) => (index >= bulkStart && index < bulkEnd))
});

export class Pagination extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentBulk: -1
        };
    }
    componentDidMount() {
        this.initialize();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.initialize();
    }
    initialize = () => {
        const {items, bulkSize} = this.props;
        const {currentBulk} = this.state;
        if (items && items.length > 0 && currentBulk < 0) {
            this.bulksNumber = items.length === bulkSize ?
                1 : Math.floor(items.length / bulkSize) + 1;
            this.bulksArr = createIndexArr(1, this.bulksNumber + 1);
            this.setState({initialized: true});
            this.setCurrentBulk(1);
        }
    };

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
    goToFirst = (event) => {
        event.preventDefault();
        this.setCurrentBulk(1);
    };
    goToLast = (event) => {
        event.preventDefault();
        this.setCurrentBulk(this.bulksArr);
    };
    setCurrentBulk = (currentBulk) => {
        const {bulkSize} = this.props;
        const bulkStart = bulkSize * (currentBulk - 1);
        const bulkEnd = bulkSize * (currentBulk);
        this.props.setPaginationInfo(new PaginationInfo(bulkStart, bulkEnd));
        this.setState({currentBulk: currentBulk});
    };
    setCurrentBulkBtn = (event) => {
        event.preventDefault();
        const {value} = event.target;
        this.setCurrentBulk(+value);
    };
    render() {
        const {bulksArr, bulksNumber} = this;
        const {currentBulk} = this.state;
        return (
            <div className="pagination-component">
                {currentBulk > 0 && bulksNumber > 1 &&
                    <div className="search-page_pagination">
                        {currentBulk > 1 &&
                            <span>
                                {bulksNumber > 2 && <button onClick={this.goToFirst}>&laquo; First</button>}
                                <button onClick={this.paginatePrevious}>&lsaquo; Previous</button>
                            </span>
                        }
                        {bulksArr.map(number => (
                            <button key={number} className={`${number === currentBulk ? "selected" : ""}`}
                                    value={number} onClick={this.setCurrentBulkBtn}>
                                {number}
                            </button>
                        ))}
                        {currentBulk < bulksNumber &&
                            <span>
                                <button onClick={this.paginateNext}>Next &rsaquo;</button>
                                {bulksNumber > 2 && <button onClick={this.goToLast}>Last &raquo;</button>}
                            </span>
                        }
                    </div>
                }
            </div>
        )
    }
}
