import React, {useEffect} from "react";
import "./game-overview.styles.scss";
import {setTitle} from "../../../util/utils";
import {connect} from "react-redux";
import {gameByIdSelector} from "../../../redux/categories-and-games/categories-and-games-selector";

function GameOverview({match, gameDetails}) {
    useEffect(() => {
        setTitle(gameDetails.displayName);
    });
    const {id} = match.params;
    return (
        <div className="game-overview-page">
            {id}
        </div>
    )
}

const mapStateToProps = (state, ownProps) => ({
    gameDetails: gameByIdSelector(ownProps.match.params.id)(state)
});

export default connect(mapStateToProps)(GameOverview);
