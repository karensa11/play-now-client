import React, {Component} from "react";
import "./categories-stripe.styles.scss";
import categories from "../../data/categories";
import CategoryItem from "../category-item/category-item.component";

const ITEM_SIZE = 300;

function calculatePageSize() {
    return Math.round((window.innerWidth - 100) / ITEM_SIZE)+1;
}

export default class CategoriesStripe extends Component {
    constructor(props) {
        super(props);
        this.state = {
            startIndex: 0,
            pageSize: calculatePageSize()
        };
    }

    componentDidMount() {
        window.addEventListener("resize", this.updateDimensions);
    }
    componentWillUnmount() {
        window.removeEventListener("resize", this.updateDimensions);
    }

    updateDimensions = () => {
        this.setState({pageSize: calculatePageSize()});
    };

    increaseStartIndex = () => {
        this.setState(prevState => ({startIndex: prevState.startIndex + 1}));
    };

    decreaseStartIndex = () => {
        this.setState(prevState => ({startIndex: prevState.startIndex - 1}));
    };

    render() {
        const endIndex = this.state.startIndex + this.state.pageSize;
        console.log("endIndex " + endIndex);
        return (
            <div className="categories-stripe-component">
                <div className="categories-container"
                     style={{
                        transform: `translate3d(-${this.state.startIndex * ITEM_SIZE}px, 0px, 0px)`,
                        transition: `all 0.25s ease 0s`,
                    }}>
                    {categories.map(category => {
                        return (
                            <CategoryItem category={category} itemSize={ITEM_SIZE - 25} />
                        )
                    })}
                </div>
                {this.state.startIndex > 0 &&
                    <div className="category-arrow left" onClick={this.decreaseStartIndex}>
                        <div className="inner">&laquo;</div>
                    </div>
                }
                {endIndex !== categories.length &&
                    <div className="category-arrow right" onClick={this.increaseStartIndex}>
                        <div className="inner">&raquo;</div>
                    </div>
                }
            </div>
        )
    }
}
