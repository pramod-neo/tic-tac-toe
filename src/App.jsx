import Player from "./components/Player.jsx";
import GameBoard from "./components/GameBoard.jsx";
import Log from "./components/Log.jsx";

import { useState } from "react";

import { WINNING_COMBINATIONS } from "./winning-combinations.js";

import GameOver from "./components/GameOver.jsx";

const PLAYER = {
  X: "Player 1",
  O: "Player 2",
};

const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function deriveActivePlayer(gameTurns) {
  let currentPlayer = "X";

  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currentPlayer = "O";
  }

  return currentPlayer;
}

function deriveGameBoard(gameTurns) {
  let gameBoard = [...INITIAL_GAME_BOARD.map((array) => [...array])];

  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;

    gameBoard[row][col] = player;
  }

  return gameBoard;
}

function deriveWinner(gameBoard, player) {
  let winner;

  for (const combination of WINNING_COMBINATIONS) {
    const firstSquare = gameBoard[combination[0].row][combination[0].column];
    const secondSquare = gameBoard[combination[1].row][combination[1].column];
    const thridSquare = gameBoard[combination[2].row][combination[2].column];

    if (
      firstSquare &&
      firstSquare === secondSquare &&
      firstSquare === thridSquare
    ) {
      winner = player[firstSquare];
    }
  }

  return winner;
}

function App() {
  const [player, setPlayer] = useState(PLAYER);
  const [gameTurns, setGameTurns] = useState([]);
  // const [playerSymbol, setPlayerSymbol] = useState("X");

  const playerSymbol = deriveActivePlayer(gameTurns);

  const gameBoard = deriveGameBoard(gameTurns);

  const winner = deriveWinner(gameBoard, player);

  let hasDraw = gameTurns.length === 9 && !winner;

  function handleSelectSquare(rowIndex, colIndex) {
    // setPlayerSymbol((prevSymbol) => (prevSymbol === "X" ? "O" : "X"));

    setGameTurns((prevTurn) => {
      let currentPlayer = deriveActivePlayer(prevTurn);

      const updatedTurn = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurn,
      ];
      return updatedTurn;
    });
  }

  function handleRematch() {
    setGameTurns([]);
  }

  function handlePlayerChange(symbol, newName) {
    setPlayer((prevPlayer) => {
      return {
        ...prevPlayer,
        [symbol]: newName,
      };
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
            onNameChange={handlePlayerChange}
          />
          <Player
            name="Player 2"
            symbol="O"
            isActive={playerSymbol === "O"}
            onNameChange={handlePlayerChange}
          />
        </ol>
        {(winner || hasDraw) && (
          <GameOver
            winner={winner}
            onRematch={handleRematch}
          />
        )}
        <GameBoard
          onSelectSquare={handleSelectSquare}
          board={gameBoard}
        />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
