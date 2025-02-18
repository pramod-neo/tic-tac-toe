import Player from "./components/Player.jsx";
import GameBoard from "./components/GameBoard.jsx";
import Log from "./components/Log.jsx";

import { useState } from "react";

function App() {
  const [gameTurns, setGameTurns] = useState([]);
  const [playerSymbol, setPlayerSymbol] = useState("X");

  function handleSelectSquare(rowIndex, colIndex) {
    setPlayerSymbol((prevSymbol) => (prevSymbol === "X" ? "O" : "X"));
    setGameTurns((prevTurn) => {
      let currentPlayer = "X";

      if (prevTurn.length > 0 && prevTurn[0].player === "X") {
        currentPlayer = "O";
      }
      const updatedTurn = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurn,
      ];
      return updatedTurn;
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol
          id="players"
          className="highlight-player">
          <Player
            name="Player 1"
            symbol="X"
            isActive={playerSymbol === "X"}
          />
          <Player
            name="Player 2"
            symbol="O"
            isActive={playerSymbol === "O"}
          />
        </ol>
        <GameBoard
          onSelectSquare={handleSelectSquare}
          turns={gameTurns}
        />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
