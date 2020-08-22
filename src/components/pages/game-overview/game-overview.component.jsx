import React, {PureComponent} from "react";
import "./game-overview.styles.scss";
import {setTitle} from "../../../util/utils";
import {connect} from "react-redux";
import {gameByIdSelector} from "../../../redux/categories-and-games/categories-and-games-selector";
import {updateGameCount} from "../../../util/firebase";

class GameOverview extends PureComponent{
    constructor(props) {
        super(props);
        this.state = {
            initialized: false
        }
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        const {gameDetails} = this.props;
        const {initialized} = this.state;
        if(gameDetails && !initialized) {
            updateGameCount(gameDetails).then();
            setTitle(gameDetails.displayName);
            this.setState({initialized: true});
        }
    }

    render() {
        const {match} = this.props;
        const {id} = match.params;
        return (
            <div className="game-overview-page">
                {id}
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => ({
    gameDetails: gameByIdSelector(ownProps.match.params.id)(state)
});

export default connect(mapStateToProps)(GameOverview);
