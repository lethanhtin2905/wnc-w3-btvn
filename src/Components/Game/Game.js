import React from "react";
import './Game.css'
import {useState} from 'react'
import Board from '../Board/Board'

function Game() {
    const [history, setHistory] = useState([{
                                                squares: Array(25).fill(null),
                                            },])
    const [currentStepNumber, setCurrentStepNumber] = useState(0);
    const [xIsNext, setXIsNext] = useState(true);
    const [isSort, setIsSort] = useState (false)

    const handleClick =(i)=>{
        const _history = history.slice(0, currentStepNumber + 1);
        const _current = _history[_history.length - 1];
        const _squares = _current.squares.slice();

        if (checkWinner(_squares).winner || _squares[i]) {
            return;
        }
        _squares[i] = xIsNext ? "X" : "O";
        setHistory(_history.concat([
                                    {
                                        squares: _squares,
                                        currentLocation: getLocation(i),
                                        stepNumber: history.length,
                                    },
                                ]),)
        setCurrentStepNumber(_history.length);
        setXIsNext(!xIsNext);
    }

    const jumpTo = (step) => {
        setCurrentStepNumber(step);
        setXIsNext(step%2===0)
    }

    const sortMoves = ()=> {
        setIsSort(!isSort)
    }

    const reset = ()=> {
        setHistory([{
                        squares: Array(25).fill(null),
                    },]);
        setCurrentStepNumber(0);
        setXIsNext(true);
        setIsSort(false)
    }

        const current = history[currentStepNumber];
        const { winner, winnerRow } = checkWinner(current.squares);

        const moves = history.map((step, move) => {
            const currentLocation = step.currentLocation ? `(${step.currentLocation})` : '';
            const desc = step.stepNumber ? `Go to move #${step.stepNumber}` : 'Go to game start';
            return (
                <li key={move}>
                    <button
                        className={move === currentStepNumber ? 'btn btn-current' : 'btn'}
                        onClick={() => jumpTo(move)}>
                        {`${desc} ${currentLocation}`}
                    </button>
                </li>
            );
        });

        let status;

        if (winner) {
            status = `Winner: ${winner}`;
        } else if (history.length === 26) {
            status = 'Draw! No one won.';
        } else {
            status = `Next player: ${xIsNext ? 'X' : 'O'}`;
        }

        return (
            <div className="container">
                <div className="game">
                    <div className="game-main">
                        <h1 className="game-name">Tic-Tac-Toe</h1>
                        <div className="game-result">{status}</div>
                        <button className="btn btn-new-game" onClick={() => reset()}>
                            New game
                        </button>
                        <div className="game-board">
                            <Board
                                squares={current.squares}
                                winnerSquares={winnerRow}
                                onClick={i => handleClick(i)}
                            />
                        </div>
                    </div>

                    <div className="game-history">
                        <h2>History</h2>
                        <hr />
                        <button className="btn btn-sort" onClick={() => sortMoves()}>
                            Sort moves
                        </button>
                        <div className="move-history">{isSort ? moves.reverse() : moves}</div>
                    </div>

                </div>
            </div>
        );
    
}

function checkWinner(squares) {
    const lines = [
        [0, 1, 2, 3, 4],
        [5, 6, 7, 8, 9],
        [10, 11, 12, 13, 14],
        [15, 16, 17, 18, 19],
        [20, 21, 22, 23, 24],
        [0, 5, 10, 15, 20],
        [1, 6, 11, 16, 21],
        [2, 7, 12, 17, 22],
        [3, 8, 13, 18, 23],
        [4, 9, 14, 9, 24],
        [0, 6, 12, 18, 24],
        [4, 8, 12, 16, 20]
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c, d, e] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c] && squares[a] === squares[d] && squares[a] === squares[e]) {
            return {
                winner: squares[a],
                winnerRow: lines[i]
            };
        }
    }
    return {
        winner: null,
        winnerRow: null
    };
}
const getLocation = (move) => {
    const locationMap = {
        0: "1, 1", 1: "1, 2", 2: "1, 3", 3: "1, 4", 4: " 1, 5",
        5: "2, 1", 6: "2, 2", 7: "2, 3", 8: "2, 4", 9: " 2, 5",
        10: "3, 1", 11: "3, 2", 12: "3, 3", 13: "3, 4", 14: " 3, 5",
        15: "4, 1", 16: "4, 2", 17: "4, 3", 18: "4, 4", 19: " 4, 5",
        20: "5, 1", 21: "5, 2", 22: "5, 3", 23: "5, 4", 24: " 5, 5",
    };

    return locationMap[move];
};

export default Game;
