import React from 'react';

function Square({ value, onSquareClick, color }) {
  return (
    <button
      className="border-2 border-black p-10 w-24 h-24 font-bold transition-colors duration-200 hover:bg-opacity-30 backdrop-blur-lg bg-white/30"
      onClick={onSquareClick}
      style={{ color }}
    >
      {value}
    </button>
  );
}

export default Square;
