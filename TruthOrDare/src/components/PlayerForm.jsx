import { useState } from "react";

export default function PlayerForm({ onStartGame }) {
  const [playerCount, setPlayerCount] = useState(2);
  const [players, setPlayers] = useState(Array(2).fill(""));

  const handlePlayerCountChange = (e) => {
    const count = parseInt(e.target.value);
    setPlayerCount(count);
    setPlayers(Array(count).fill(""));
  };

  const handlePlayerNameChange = (index, name) => {
    const newPlayers = [...players];
    newPlayers[index] = name;
    setPlayers(newPlayers);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (players.some(name => name.trim() === "")) {
      alert("Please enter names for all players");
      return;
    }
    onStartGame(players);
  };

  return (
    <div className="player-form">
      <h2>Setup Your Game</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Number of Players:</label>
          <input
            type="number"
            min="2"
            max="10"
            value={playerCount}
            onChange={handlePlayerCountChange}
          />
        </div>
        
        <div className="players-list">
          {players.map((player, index) => (
            <div key={index} className="form-group">
              <label>Player {index + 1}:</label>
              <input
                type="text"
                value={player}
                onChange={(e) => handlePlayerNameChange(index, e.target.value)}
                placeholder={`Player ${index + 1} Name`}
                required
              />
            </div>
          ))}
        </div>
        
        <button type="submit" className="start-button">Start Game</button>
      </form>
    </div>
  );
}