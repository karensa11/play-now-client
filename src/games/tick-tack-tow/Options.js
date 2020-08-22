import React from "react";

export default function Options({
                                    player1Wins,
                                    player2Wins,
                                    restartGame
                                })
{
    return (
        <div align="center" className="ticktack-details">
            <div>
                Player 1 wins: {player1Wins}
            </div>
            <div>
                Player 2 wins: {player2Wins}
            </div>
            <div>
                <button onClick={restartGame}>Restart</button>
            </div>
        </div>
    )
}