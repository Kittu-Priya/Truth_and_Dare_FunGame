import { useState } from "react";
import PlayerForm from "./components/PlayerForm";
import GameScreen from "./components/GameScreen";
import WinnerScreen from "./components/WinnerScreen";
import "./styles.css";

export default function App() {
  const [gameState, setGameState] = useState("setup");
  const [players, setPlayers] = useState([]);
  const [winner, setWinner] = useState(null);

  const handleStartGame = (playerNames) => {
    setPlayers(playerNames);
    setGameState("playing");
  };

  const handleGameEnd = (gameWinner) => {
    setWinner(gameWinner);
    setGameState("ended");
  };

  const handleRestart = () => {
    setGameState("setup");
    setPlayers([]);
    setWinner(null);
  };

  return (
    <div className="app">
      <h1>Truth or Dare</h1>
      
      {gameState === "setup" && <PlayerForm onStartGame={handleStartGame} />}
      {gameState === "playing" && <GameScreen players={players} onGameEnd={handleGameEnd} />}
      {gameState === "ended" && <WinnerScreen winner={winner} onRestart={handleRestart} />}
    </div>
  );
}