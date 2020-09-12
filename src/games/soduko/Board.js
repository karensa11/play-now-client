import React from "react";

export default function Board({boardItems, clickCell})
{
    return (
        <div className="soduko-board">
            {boardItems.map((item, index) => {
                let style = "soduko-board-cell ";
                style = index % 3 === 0 ? style + "soduko-board-cell-border-left " : style;
                style = index % 3 === 2 ? style + "soduko-board-cell-border-right " : style;
                style = index % 27 > 17 ? style + "soduko-board-cell-border-bottom " : style;
                style = index % 27 < 9 ? style + "soduko-board-cell-border-top " : style;
                style = item.preSet ? style + "soduko-board-cell-preset " : style;
                style = item.isProblematic ? style + "soduko-board-cell-problematic " : style;
                style = item.isExists ? style + "soduko-board-cell-exists " : style;
                return (
                    <div
                        key={index}
                        className={style} onClick={() => clickCell(index)}>
                        <span>
                            {item.number === -1 ?
                                <span>&nbsp;</span>
                                :
                                <span>{item.number}</span>
                            }
                        </span>
                    </div>
                )
            })}
        </div>
    )
}
