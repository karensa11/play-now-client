import React, {Component} from "react";
import "./items-stripe.styles.scss";

export default class ItemsStripe extends Component {
    constructor(props) {
        super(props);
        this.state = {
            startIndex: 0,
            pageSize: this.calculatePageSize()
        };
    }

    componentDidMount() {
        window.addEventListener("resize", this.updateDimensions);
    }
    componentWillUnmount() {
        window.removeEventListener("resize", this.updateDimensions);
    }

    calculatePageSize = () => {
        const {itemSize} = this.props;
        return Math.round((window.innerWidth - 100) / itemSize) + 1;
    };

    updateDimensions = () => {
        this.setState({pageSize: this.calculatePageSize()});
    };

    increaseStartIndex = () => {
        this.setState(prevState => ({startIndex: prevState.startIndex + 1}));
    };

    decreaseStartIndex = () => {
        this.setState(prevState => ({startIndex: prevState.startIndex - 1}));
    };

    render() {
        const {items, itemRenderer, itemSize} = this.props;
        const {startIndex, pageSize} = this.state;
        const endIndex = startIndex + pageSize;
        return (
            <div className="items-stripe-component">
                <div className="items-container"
                     style={{
                         transform: `translate3d(-${startIndex * itemSize}px, 0px, 0px)`,
                         transition: "all 0.25s ease 0s",
                     }}>
                    {items.map(item => {
                        return (
                            <div key={item.id}>{itemRenderer(item)}</div>
                        )
                    })}
                </div>
                {startIndex > 0 &&
                    <div className="arrow left" onClick={this.decreaseStartIndex}>
                        <div className="inner">&laquo;</div>
                    </div>
                }
                {endIndex !== items.length &&
                    <div className="arrow right" onClick={this.increaseStartIndex}>
                        <div className="inner">&raquo;</div>
                    </div>
                }
            </div>
        )
    }
}
