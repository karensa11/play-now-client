import React, {Component} from "react";
import "./items-table.styles.scss";
import {createIndexArr} from "../../../util/objectUtils";
import memoize from "memoize-one";

export default class ItemsTable extends Component{
    constructor(props) {
        super(props);
        this.state = {
            currentBulk: 1
        };
        const {items, bulkSize} = this.props;
        this.bulksNumber = items.length === bulkSize ?
            1 : Math.floor(items.length / bulkSize) + 1;
        this.bulksArr = createIndexArr(1, this.bulksNumber + 1);
    }

    componentDidMount() {
        const {currentBulk} = this.state;
        this.setCurrentBulk(currentBulk);
    }

    setCurrentBulk = (currentBulk) => {
        this.setState({currentBulk: currentBulk});
    };
    setCurrentBulkBtn = (event) => {
        event.preventDefault();
        const {value} = event.target;
        this.setCurrentBulk(value);
    };
    paginatePrevious = (event) => {
        event.preventDefault();
        this.setCurrentBulk(this.state.currentBulk - 1);
    };
    paginateNext = (event) => {
        event.preventDefault();
        this.setCurrentBulk(this.state.currentBulk + 1);
    };
    goToFirst = (event) => {
        event.preventDefault();
        this.setCurrentBulk(1);
    };
    goToLast = (event) => {
        event.preventDefault();
        this.setCurrentBulk(this.bulksArr);
    };
    calculateItemsToDisplay = memoize((items, bulkStart, bulkEnd) => {
        return items.filter((value, index) => (index >= bulkStart && index < bulkEnd))
    });

    render() {
        const {currentBulk} = this.state;
        const {selectedItemId, bulkSize, items} = this.props;
        const {bulksNumber, bulksArr} = this;
        const bulkStart = bulkSize * (currentBulk - 1);
        const bulkEnd = bulkSize * (currentBulk);
        const itemsToDisplay = this.calculateItemsToDisplay(items, bulkStart, bulkEnd);
        return (
            <div className="items-table-component">
                <div className="items-table-component_items">
                    {itemsToDisplay.map(item => (
                        <div key={item.id} className={`item ${item.id === selectedItemId ? "selected-item" : ""}`}
                             value={item.id}>
                            {this.props.itemRenderer(item)}
                        </div>
                    ))}
                </div>
                {bulksNumber > 1 &&
                    <div className="items-table-component_pagination">
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
