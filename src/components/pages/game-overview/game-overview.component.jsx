import React from "react";
import "./game-overview.styles.scss";

export default function GameOverview({match}) {
    const {id} = match.params;
    return (
        <div className="game-overview-page">
            {id}
        </div>
    )
}
