import React, {Component} from "react";
import "./search-game.styles.scss";
import search from "../../../assets/search.png";
import {withRouter} from "react-router-dom";
import {navigateToSearchWithString} from "../../../util/navigationUtils";

class SearchGame extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchString: ""
        }
    }
    setSearchString = (event) => {
        const {value} = event.target;
        this.setState({searchString: value});
    };
    search = () => {
        const {searchString} = this.state;
        const {history} = this.props;
        navigateToSearchWithString(history, searchString);
    };
    render () {
        return (
            <div className="search-game-component">
                <div className="left">
                    <input placeholder="Search for a game..." size={30} onChange={this.setSearchString} />
                </div>
                <div className="right">
                    <img src={search} alt="search" onClick={this.search} />
                </div>
            </div>
        )
    }
}

export default withRouter(SearchGame);
