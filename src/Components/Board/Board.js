import Square from '../Square/Squares'
import './Board.css'

function Board(props) {
    const createBoard = (row, col) => {
        const board = [];
        let cellCounter = 0;

        for (let i = 0; i < row; i += 1) {
            const columns = [];
            for (let j = 0; j < col; j += 1) {
                columns.push(renderSquare(cellCounter));
                cellCounter++;
            }
            board.push(<div key={i} className="board-row">{columns}</div>);
        }

        return board;
    }

    const renderSquare = (i) => {
        const winnerClass =
        props.winnerSquares &&
                (props.winnerSquares[0] === i || props.winnerSquares[1] === i || props.winnerSquares[2] === i || props.winnerSquares[3] === i || props.winnerSquares[4] === i)?'square-winner' : '';
        return (
            <Square
                winnerClass={winnerClass}
                key={i}
                value={props.squares[i]}
                onClick={() => props.onClick(i)}
            />
        )
    };

    return (
        <div>{createBoard(5, 5)}</div>
    );
}

export default Board