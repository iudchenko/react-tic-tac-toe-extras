import { useState } from "react";
import Board from "./Board";

const Game = () => {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [location, setLocation] = useState([]);
  const [currentMove, setCurrentMove] = useState(0);
  const [sortedAsc, setSortedAsc] = useState(true);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares, newLocation) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setLocation([...location, newLocation]);
    console.log(location);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  function sortMoves() {
    setSortedAsc(!sortedAsc);
  }

  const winner = calculateWinner(currentSquares);
  let status;
  if (winner) {
    status = "Winner: " + winner.player;
  } else if (!currentSquares.includes(null)) {
    status = "Draw";
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = "Go to move #" + move + " @ " + location[move - 1];
    } else {
      description = "Go to game start";
    }
    return (
      <li key={move}>
        {move === currentMove ? (
          <span>You are at move {currentMove}</span>
        ) : (
          <button onClick={() => jumpTo(move)}>{description}</button>
        )}
      </li>
    );
  });

  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return { player: squares[a], line: [a, b, c] };
      }
    }
    return null;
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board
          xIsNext={xIsNext}
          squares={currentSquares}
          onPlay={handlePlay}
          winningSquares={winner ? winner.line : []}
          status={status}
        />
      </div>
      <div className="game-info">
        {currentMove > 0 && <button onClick={sortMoves}>Sort</button>}
        <ol>{sortedAsc ? moves : [...moves].reverse()}</ol>
      </div>
    </div>
  );
};

export default Game;
