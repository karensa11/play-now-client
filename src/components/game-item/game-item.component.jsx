import React from "react";
import "./game-item.styles.scss";
import {withRouter} from "react-router-dom";
import {goToGame, navigateToAndRefresh} from "../../util/navigationUtils";

function GameItem({gameData, history}) {
    const {displayName, imageUrl} = gameData;
    const navigateToGame = () => {
        goToGame(history, gameData);
    };
    return (
        <div className="game-item-component" title={displayName} onClick={navigateToGame}>
            <div className="game-item-content">
                <img src={imageUrl} alt={displayName} />
                <div className="name">{displayName}</div>
            </div>
        </div>
    )
}

export default withRouter(GameItem);
