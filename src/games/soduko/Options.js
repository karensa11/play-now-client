import React from "react";

export default function Options({
                                    selectNumberForBoard,
                                    selectedNumber,
                                    restartGame
                                })
{
    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    return (
        <div className="soduko-options">
            <div className="soduko-options-content">
                <div className="restart">
                    <button onClick={restartGame}>Restart</button>
                </div>
                <div className="soduko-numbers">
                    {numbers.map(number => {
                        const className = (number === selectedNumber) ?
                            "soduko-number-cell soduko-number-cell-selected" :
                            "soduko-number-cell soduko-number-cell-regular";
                        return (
                            <div key={number} className={className} onClick={() => selectNumberForBoard(number)}>
                                {number}
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}