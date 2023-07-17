import Square from "./Square";

function Board({ xIsNext, squares, status, onPlay, winner, winningSquares }) {
  function handleClick(i) {
    const locations = [
      [1, 1],
      [1, 2],
      [1, 3],
      [2, 1],
      [2, 2],
      [2, 3],
      [3, 1],
      [3, 2],
      [3, 3],
    ];
    if (squares[i] || winner) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    // console.log(locations[i]);
    onPlay(nextSquares, locations[i]);
  }

  // const winner = calculateWinner(squares);
  // let status;
  // if (winner) {
  //   status = "Winner: " + winner;
  // } else {
  //   status = "Next player: " + (xIsNext ? "X" : "O");
  // }

  let boardSquares = [];

  for (let row = 0; row < 3; row++) {
    let boardRow = [];

    for (let col = 0; col < 3; col++) {
      const currentSquare = row * 3 + col;
      boardRow.push(
        <Square
          key={currentSquare}
          value={squares[currentSquare]}
          isWinning={winningSquares.includes(currentSquare)}
          onSquareClick={() => handleClick(currentSquare)}
        />
      );
    }
    boardSquares.push(
      <div key={row} className="board-row">
        {boardRow}
      </div>
    );
  }

  return (
    <>
      <div className="status">{status}</div>
      {boardSquares}
    </>
  );
}

export default Board;
