import React from 'react';
import Square from './Square';
import { calculateWinner } from './utils/calculateWinner';

function Board({ xIsNext, squares, onPlay, colorX, colorO, customX, customO, gameEnded }) {
  function handleClick(i) {
    if (gameEnded || calculateWinner(squares) || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? customX : customO;
    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);
  let status = winner ? 'Winner: ' + winner : (squares.every(Boolean) ? 'Draw!' : 'Next player: ' + (xIsNext ? customX : customO));

  return (
    <div className="flex flex-col items-center mb-6">
      <div className="text-lg font-semibold mb-4">{status}</div>
      <div className="grid grid-cols-3 gap-2">
        {squares.map((square, i) => (
          <Square
            key={i}
            value={square}
            onSquareClick={() => handleClick(i)}
            color={square === customX ? colorX : square === customO ? colorO : 'black'}
          />
        ))}
      </div>
    </div>
  );
}

export default Board;
