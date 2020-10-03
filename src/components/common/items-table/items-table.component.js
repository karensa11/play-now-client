import React, {Component} from "react";
import "./items-table.styles.scss";
import {calculateItemsToDisplay, Pagination} from "../pagination/pagination.component";

export default class ItemsTable extends Component{
    constructor(props) {
        super(props);
        this.state = {
            paginationInfo: null
        };
    }
    setPaginationInfo = (paginationInfo) => {
        this.setState({paginationInfo: paginationInfo});
    };

    render() {
        const {paginationInfo} = this.state;
        const {selectedItemId, bulkSize, items} = this.props;
        const {bulkStart, bulkEnd} = (paginationInfo || {});
        const itemsToDisplay = calculateItemsToDisplay(items, bulkStart, bulkEnd);
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
                <Pagination
                    items={items}
                    bulkSize={bulkSize}
                    setPaginationInfo={this.setPaginationInfo}
                />
            </div>
        )
    }
}
