import React from "react";
import "./game-item.styles.scss";
import {gameLink} from "../../util/navigationUtils";

function GameItem({gameData}) {
    const {displayName, imageUrl} = gameData;
    const gameLinkUrl = gameLink(gameData);
    return (
        <div className="game-item-component">
            <a title={displayName} href={gameLinkUrl}>
                <div className="game-items">
                    <div className="game-item-content">
                        <img src={imageUrl} alt={displayName} />
                        <div className="name">{displayName}</div>
                    </div>
                </div>
            </a >
        </div>
    )
}

export default GameItem;
