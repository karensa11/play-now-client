import React, {Component} from "react";
import "./game.scss";
import Board from "./Board";
import Options from "./Options";

function checkProblematicNumber(board, index, number) {
    const indexStartHorizontal = index - index % 9;
    const indexEndHorizontal = index + (9 - index % 9);
    board.forEach((item, itemIndex) => {
        if(itemIndex >= indexStartHorizontal && itemIndex < indexEndHorizontal){
            if(item.number === number && itemIndex !== index) {
                board[index].isExists = true;
                board[itemIndex].isProblematic = true;
            }
        }
    })
}
function markCellAsPre(board, index, number) {
    board[index].number = number;
    board[index].preSet = true;
}
export default class Game extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            board: [
                {number:-1}, {number:-1}, {number:-1},
                {number:-1}, {number:-1}, {number:-1},
                {number:-1}, {number:-1}, {number:-1},
                {number:-1}, {number:-1}, {number:-1},
                {number:-1}, {number:-1}, {number:-1},
                {number:-1}, {number:-1}, {number:-1},
                {number:-1}, {number:-1}, {number:-1},
                {number:-1}, {number:-1}, {number:-1},
                {number:-1}, {number:-1}, {number:-1},

                {number:-1}, {number:-1}, {number:-1},
                {number:-1}, {number:-1}, {number:-1},
                {number:-1}, {number:-1}, {number:-1},
                {number:-1}, {number:-1}, {number:-1},
                {number:-1}, {number:-1}, {number:-1},
                {number:-1}, {number:-1}, {number:-1},
                {number:-1}, {number:-1}, {number:-1},
                {number:-1}, {number:-1}, {number:-1},
                {number:-1}, {number:-1}, {number:-1},

                {number:-1}, {number:-1}, {number:-1},
                {number:-1}, {number:-1}, {number:-1},
                {number:-1}, {number:-1}, {number:-1},
                {number:-1}, {number:-1}, {number:-1},
                {number:-1}, {number:-1}, {number:-1},
                {number:-1}, {number:-1}, {number:-1},
                {number:-1}, {number:-1}, {number:-1},
                {number:-1}, {number:-1}, {number:-1},
                {number:-1}, {number:-1}, {number:-1},
            ],
            selectedNumber: 1
        }
    }
    componentDidMount() {
        this.restartGame();
    }

    restartGame = () => {
        const board = [];
        this.state.board.forEach(item => {
            board.push({number: -1})
        });
        markCellAsPre(board, 0,  8);
        markCellAsPre(board, 10, 7);
        markCellAsPre(board, 15, 7);
        markCellAsPre(board, 22, 4);
        markCellAsPre(board, 25, 3);
        markCellAsPre(board, 30, 2);
        markCellAsPre(board, 36, 1);
        markCellAsPre(board, 40, 5);
        markCellAsPre(board, 43, 8);
        markCellAsPre(board, 50, 6);
        markCellAsPre(board, 65, 1);
        markCellAsPre(board, 73, 9);
        this.setState({board: board, selectedNumber: 1});
    };
    clickCell = (index) => {
        if(this.state.board[index].preSet){
            return;
        }
        const board = [...this.state.board];
        board[index].number = this.state.selectedNumber;
        checkProblematicNumber(board, index, this.state.selectedNumber);
        this.setState({board: board});
    };
    selectNumberForBoard = (number) => {
        this.setState({selectedNumber: number});
    };

    render() {
        return (
            <div className="soduko">
                <div className="soduko-content">
                    <Board
                        boardItems={this.state.board}
                        clickCell={this.clickCell}
                    />
                    <Options
                        selectedNumber={this.state.selectedNumber}
                        selectNumberForBoard={this.selectNumberForBoard}
                        restartGame={this.restartGame}
                    />
                </div>
            </div>
        )
    }
}
