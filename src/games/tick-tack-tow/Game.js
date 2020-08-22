import React, {Component} from "react";
import Board from "./Board";
import "./game.scss";
import Options from "./Options";

function searchStrike(boardValues, index1, index2, index3) {
    if( boardValues[index1].player &&
        boardValues[index1].player === boardValues[index2].player &&
        boardValues[index2].player === boardValues[index3].player){
        const winner = boardValues[index1].player;
        boardValues[index1].winnerStrike = true;
        boardValues[index2].winnerStrike = true;
        boardValues[index3].winnerStrike = true;
        return winner;
    }
    return 0;
}
export default class Game extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            boardValues: [
                {player: null}, {player: null}, {player: null},
                {player: null}, {player: null}, {player: null},
                {player: null}, {player: null}, {player: null},
            ],
            currentPlayer: 1,
            winnerPlayer: 0,
            player1Wins: 0,
            player2Wins: 0
        }
    }

    boardCellClicked = (index) => {
        if(this.state.winnerPlayer || this.state.boardValues[index].player){
            return;
        }
        const boardValuesUpdated = this.state.boardValues.map((item, j) => {
            if (j === index) {
                return {...item, player:this.state.currentPlayer};
            } else {
                return item;
            }
        });
        let winnerPlayer = 0;
        winnerPlayer = winnerPlayer || searchStrike(boardValuesUpdated, 0, 1, 2);
        winnerPlayer = winnerPlayer || searchStrike(boardValuesUpdated, 3, 4, 5);
        winnerPlayer = winnerPlayer || searchStrike(boardValuesUpdated, 6, 7, 8);
        winnerPlayer = winnerPlayer || searchStrike(boardValuesUpdated, 0, 3, 6);
        winnerPlayer = winnerPlayer || searchStrike(boardValuesUpdated, 1, 4, 7);
        winnerPlayer = winnerPlayer || searchStrike(boardValuesUpdated, 2, 5, 8);
        winnerPlayer = winnerPlayer || searchStrike(boardValuesUpdated, 0, 4, 8);
        winnerPlayer = winnerPlayer || searchStrike(boardValuesUpdated, 2, 4, 6);
        const player1Wins = this.state.player1Wins + (winnerPlayer === 1 ? 1 : 0);
        const player2Wins = this.state.player2Wins + (winnerPlayer === 2 ? 1 : 0);
        const currentPlayerUpdated = 3 - this.state.currentPlayer;
        this.setState({currentPlayer: currentPlayerUpdated, boardValues:boardValuesUpdated, winnerPlayer:winnerPlayer,
            player1Wins:player1Wins, player2Wins:player2Wins});
    };

    restartGame = () => {
        this.setState({
            boardValues: [
                {player: null}, {player: null}, {player: null},
                {player: null}, {player: null}, {player: null},
                {player: null}, {player: null}, {player: null},
            ],
            currentPlayer: 1,
            winnerPlayer: 0
        });
    };

    render() {
        return (
            <div>
                <Board
                    boardValues={this.state.boardValues}
                    boardCellClicked={this.boardCellClicked}
                />
                <Options
                    player1Wins={this.state.player1Wins}
                    player2Wins={this.state.player2Wins}
                    restartGame={this.restartGame}
                />
            </div>
        )
    }
}