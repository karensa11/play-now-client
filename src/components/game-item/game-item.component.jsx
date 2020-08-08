import React from "react";
import "./game-item.styles.scss";
import {navigateToAndRefresh} from "../../util/utils";
import {withRouter} from "react-router-dom";

function GameItem({game, history}) {
    const {id, displayName, imageUrl} = game;
    const navigateToGame = () => {
        navigateToAndRefresh(history, `/game/${id}`);
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
