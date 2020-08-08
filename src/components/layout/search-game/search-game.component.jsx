import React, {Component} from "react";
import "./search-game.styles.scss";
import search from "../../../assets/search.png";

export default class SearchGame extends Component {
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
    render () {
        return (
            <div className="search-game-component">
                <div className="left">
                    <input placeholder="Search for a game..." size={30} onChange={this.setSearchString} />
                </div>
                <div className="right">
                    <img src={search} alt="search" />
                </div>
            </div>
        )
    }
}
