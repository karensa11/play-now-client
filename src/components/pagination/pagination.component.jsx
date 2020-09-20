import React, {Component} from "react";
import "./pagination.styles.scss";
import memoize from "memoize-one";

class PaginationData {
    constructor(items, bulkSize) {
        this.items = items;
        this.bulkSize = bulkSize;
        this.currentBulk = 1;
    }

    goToNextBulk = () => {
        this.currentBulk++;
    };

    goToPreviousBulk = () => {
        this.currentBulk--;
    };

    getBulkStart = () => {
        return this.bulkSize * (this.currentBulk - 1);
    };

    getBulkEnd = () => {
        return this.bulkSize * (this.currentBulk);
    };

    itemsToDisplay = () => {
        const bulkStart = this.getBulkStart();
        const bulkEnd = this.getBulkEnd();
        return this._calculateItemsToDisplay(this.items, bulkStart, bulkEnd);
    };

    _calculateItemsToDisplay = memoize((items, bulkStart, bulkEnd) => {
        return (items || []).filter((value, index) => (index >= bulkStart && index < bulkEnd))
    });
}

export default class Pagination extends Component {
    constructor(props) {
        super(props);
        this.state = {
            paginationData: null
        }
    }

    componentDidUpdate() {
        let {paginationData} = this.state;
        const {items, bulkSize} = this.props;
        if (!paginationData && items) {
            this.setState({paginationData: new PaginationData(items, bulkSize)})
        }
    }

    render() {
        return (
            <div className="pagination-component">
                Pagination
            </div>
        )
    }
}
