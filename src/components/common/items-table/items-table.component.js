import React, {Component} from "react";
import "./items-table.styles.scss";
import {createIndexArr} from "../../../util/objectUtils";

export default class ItemsTable extends Component{
    constructor(props) {
        super(props);
        this.state = {
            currentBulk: 1,
            bulksNumber: 0,
            itemsToDisplay: []
        };
        const {items, bulkSize} = this.props;
        this.bulksNumber = items.length === bulkSize ?
            1 : Math.floor(items.length / bulkSize) + 1;
        console.log("this.bulksNumber " + this.bulksNumber);
        this.bulksArr = createIndexArr(1, this.bulksNumber + 1);
    }

    componentDidMount() {
        const {currentBulk} = this.state;
        this.setCurrentBulk(currentBulk);
    }
    calculateCurrentItems = (currentBulk) => {
        const {bulkSize, items} = this.props;
        console.log(bulkSize);
        console.log(items);
        console.log(currentBulk);
        const bulkStart = bulkSize * currentBulk;
        const bulkEnd = bulkSize * (currentBulk + 1);
        return items.filter((value, index) => (index >= bulkStart && index < bulkEnd));
    };

    setCurrentBulk = (currentBulk) => {
        const itemsToDisplay = this.calculateCurrentItems(currentBulk - 1);
        this.setState({currentBulk: currentBulk, itemsToDisplay: itemsToDisplay});
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

    render() {
        const {currentBulk, itemsToDisplay} = this.state
        const {selectedItemId} = this.props;
        const {bulksNumber, bulksArr} = this;
        return (
            <div className="items-table-component">
                <div className="items">
                    {itemsToDisplay.map(item => (
                        <div key={item.id} className={`item ${item.id === selectedItemId ? "selected-item" : ""}`}
                             value={item.id}>
                            {this.props.itemRenderer(item)}
                        </div>
                    ))}
                </div>
                {bulksNumber > 1 &&
                    <div className="pagination">
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
