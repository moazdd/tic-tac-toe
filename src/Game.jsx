import React, { useState } from 'react';
import Board from './Board';
import { calculateWinner } from './utils/calculateWinner';

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const [colorX, setColorX] = useState('#0168ef');
  const [colorO, setColorO] = useState('#ff0000');
  const [customX, setCustomX] = useState('❌');
  const [customO, setCustomO] = useState('⭕');
  const [useCustom, setUseCustom] = useState(false);
  const [gameStatus, setGameStatus] = useState('ongoing');

  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);

    const winner = calculateWinner(nextSquares);
    if (winner) {
      setGameStatus('finished');
    } else if (nextSquares.every(Boolean)) {
      setGameStatus('finished');
    }
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    const description = move > 0 ? 'Go to move #' + move : 'Go to game start';
    return (
      <li key={move}>
        <button
          className="text-blue-500 hover:underline"
          onClick={() => jumpTo(move)}
        >
          {description}
        </button>
      </li>
    );
  });

  const winner = calculateWinner(currentSquares);
  const gameEnded = winner || currentSquares.every(Boolean); // Check if the game has ended

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-500">
      <div className="bg-white/20 backdrop-blur-lg p-8 rounded-lg shadow-lg max-w-md w-full">
        <div className="mb-4">
          <label className="mr-2">
            <input
              type="checkbox"
              disabled={gameStatus === 'finished'}
              checked={useCustom}
              onChange={() => setUseCustom(!useCustom)}
              className="mr-2"
            />
            Use Custom Elements (Emojis)
          </label>
        </div>
        <Board
          xIsNext={xIsNext}
          squares={currentSquares}
          onPlay={handlePlay}
          colorX={colorX}
          colorO={colorO}
          customX={useCustom ? customX : 'X'}
          customO={useCustom ? customO : 'O'}
          gameEnded={gameEnded} // Pass gameEnded to the Board
        />
        <div className="game-info mb-6">
          <ol>{moves}</ol>
        </div>
        <div className="color-picker flex justify-center space-x-4 mb-4">
          <div>
            <label htmlFor="colorX" className="block">X Color:</label>
            <input
              type="color"
              id="colorX"
              value={colorX}
              onChange={(e) => setColorX(e.target.value)}
              className="w-16 h-10 border rounded"
            />
          </div>
          <div>
            <label htmlFor="colorO" className="block">O Color:</label>
            <input
              type="color"
              id="colorO"
              value={colorO}
              onChange={(e) => setColorO(e.target.value)}
              className="w-16 h-10 border rounded"
            />
          </div>
        </div>
        <div className="custom-emojis flex justify-center space-x-4">
          <div>
            <label htmlFor="customX" className="block">Custom X:</label>
            <input
              type="text"
              id="customX"
              value={customX}
              onChange={(e) => gameStatus === 'ongoing' ? setCustomX(e.target.value) : null} // Disable change if game finished
              className="border rounded p-1"
              disabled={gameStatus === 'finished'} // Disable input if game finished
            />
          </div>
          <div>
            <label htmlFor="customO" className="block">Custom O:</label>
            <input
              type="text"
              id="customO"
              value={customO}
              onChange={(e) => gameStatus === 'ongoing' ? setCustomO(e.target.value) : null} // Disable change if game finished
              className="border rounded p-1"
              disabled={gameStatus === 'finished'} // Disable input if game finished
            />
          </div>
        </div>
      </div>
    </div>
  );
}
