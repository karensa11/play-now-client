import React from "react";

export default function Board({
                                    boardValues,
                                    boardCellClicked
                            })
{
    return(
        <div className="ticktack-board">
            {boardValues.map((boardValue, index) => {
                return (
                    <div key={index}
                         className={boardValue.winnerStrike ?
                        "ticktack-board-cell ticktack-board-cell-winner" :
                        "ticktack-board-cell ticktack-board-cell-regular"}
                         onClick={() => boardCellClicked(index)}>
                        <div className="ticktack-board-cell-item">
                            {boardValue.player === 1 &&
                                <span className="ticktack-player-X">X</span>
                            }
                            {boardValue.player === 2 &&
                                <span className="ticktack-player-O">O</span>
                            }
                        </div>
                    </div>
                )
            })}
        </div>
    )
}