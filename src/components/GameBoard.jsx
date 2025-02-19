export default function GameBoard({ onSelectSquare, board }) {
  // const [gameBoard, setGameBoard] = useState(initialGameBoard);

  // function handleOnClick(rowIndex, symbolIndex) {
  //   setGameBoard((prevGameBoard) => {
  //     const updatedGameBoard = [
  //       ...prevGameBoard.map((innerArray) => [...innerArray]),
  //     ];
  //     updatedGameBoard[rowIndex][symbolIndex] = symbol;
  //     return updatedGameBoard;
  //   });

  //   handlePlayerTurns();
  // }

  return (
    <ol id="game-board">
      {board.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((playerSymbol, symbolIndex) => (
              <li key={symbolIndex}>
                <button
                  onClick={() => onSelectSquare(rowIndex, symbolIndex)}
                  disabled={playerSymbol !== null}>
                  {playerSymbol}
                </button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
}
