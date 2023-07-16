import { useState } from "react";

const Square = ({ value, onSquareClick, isWinning }) => {
  return (
    <button
      className="square"
      onClick={onSquareClick}
      style={isWinning ? { backgroundColor: "red" } : {}}
    >
      {value}
    </button>
  );
};

export default Square;
