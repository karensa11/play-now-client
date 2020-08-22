import React, {Component} from "react";
import "./drop-down.styles.scss";
import ReactDOM from "react-dom";
import onClickOutsideHOC from "react-onclickoutside";

class DropDown extends Component{
    constructor(props) {
        super(props);
        this.state = {
            selectionOpen: false
        }
    }
    changeSelectionOpenStatus = (event) => {
        this.setState((prevState) => ({selectionOpen: !prevState.selectionOpen}));
    };
    handleClickOutside = () => {
        this.setState({selectionOpen: false});
    }
    render()
    {
        const {title, values, selectedValue, onChangeValue} = this.props;
        const {selectionOpen} = this.state;
        return (
            <div className="drop-down-component">
                <div className="drop-down-component_selection">
                    <div className="drop-down-component_title">{title}</div>
                    <button onClick={this.changeSelectionOpenStatus}>
                        {values[0].displayName}
                        <span className="drop-down-component_selection-arrow">&nbsp;&nbsp;&nbsp;&#709;</span>
                    </button>
                </div>
                {selectionOpen &&
                    <div className="drop-down-component_values">
                        <ul>
                            {values.map(value => (
                                <li key={value.code}
                                    className={`${selectedValue === value.code ? "selected" : ""}`}
                                    value={value.code}>
                                    <span>{value.displayName}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                }
            </div>
        )
    }
}

export default onClickOutsideHOC(DropDown);
