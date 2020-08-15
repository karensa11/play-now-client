import React, {Component} from "react";
import "./categories-stripe.styles.scss";
import CategoryItem from "../category-item/category-item.component";
import {connect} from "react-redux";
import {createStructuredSelector} from "reselect";
import {allCategoriesSelector} from "../../../redux/categories-and-games/categories-and-games-selector";

const MAX_WIDTH = 300;
const RIGHT_SPACE = 400;

class CategoriesStripe extends Component {
    constructor(props) {
        super(props);
        this.state = {
            startIndex: 0,
            startLocation: 0,
            width: 0,
            itemWidth: 0,
            pageSize: 0
        };
    }

    componentDidMount() {
        window.addEventListener("resize", this.updateDimensions);
        this.updateDimensions();
    }
    componentWillUnmount() {
        window.removeEventListener("resize", this.updateDimensions);
    }

    updateDimensions = () => {
        const categoriesWidth = window.innerWidth - RIGHT_SPACE;
        const maxItemsNum = Math.floor(categoriesWidth / (MAX_WIDTH - 25));
        const itemWidthUpdated = categoriesWidth / (maxItemsNum - 0.5) - 2;
        this.setState({pageSize: maxItemsNum, width: categoriesWidth, itemWidth: itemWidthUpdated});
    };

    updateStartIndex = (newStartIndex) => {
        const {itemWidth} = this.state;
        const newStartLocation = newStartIndex * (itemWidth - 25);
        this.setState({startIndex: newStartIndex, startLocation: newStartLocation});
    };

    increaseStartIndex = () => {
        const {startIndex} = this.state;
        this.updateStartIndex(startIndex + 1);
    };

    decreaseStartIndex = () => {
        const {startIndex} = this.state;
        this.updateStartIndex(startIndex - 1);
    };

    render() {
        const {startIndex, pageSize, startLocation, width, itemWidth} = this.state;
        const {categories} = this.props;
        const endIndex = startIndex + pageSize;
        return (
            <div className="categories-stripe-component">
                <div className="categories-container"
                     style={{width: `${width}px`}}>
                    <div className="categories-container-layout"
                         style={{
                             transform: `translate3d(-${startLocation}px, 0px, 0px)`
                         }}>
                        {categories.map(category => {
                            return (
                                <CategoryItem key={category.id} category={category}
                                              itemSize={itemWidth - 25} />
                            )
                        })}
                    </div>
                </div>
                <div className="arrows"
                     style={{width: `${width + 40}px`}}>
                    {startIndex > 0 &&
                        <div className="arrow left" onClick={this.decreaseStartIndex}>
                            <div className="inner">&laquo;</div>
                        </div>
                    }
                    {endIndex !== categories.length &&
                        <div className="arrow right" onClick={this.increaseStartIndex}>
                            <div className="inner">&raquo;</div>
                        </div>
                    }
                </div>
            </div>
        )
    }
}

const mapStateToProps = createStructuredSelector({
    categories: allCategoriesSelector
});

export default connect(mapStateToProps)(CategoriesStripe);
