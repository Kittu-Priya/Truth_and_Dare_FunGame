// import { useState, useEffect } from "react";
// import { truths } from "../data/truths";
// import { dares } from "../data/dares";
// import Timer from "./Timer";

// export default function GameScreen({ players, onGameEnd }) {
//   const [activePlayers, setActivePlayers] = useState([...players]);
//   const [eliminatedPlayers, setEliminatedPlayers] = useState([]);
//   const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
//   const [currentPlayer, setCurrentPlayer] = useState("");
//   const [selectedOption, setSelectedOption] = useState(null);
//   const [currentQuestion, setCurrentQuestion] = useState("");
//   const [gameStatus, setGameStatus] = useState("select");
//   const [winner, setWinner] = useState(null);
//   const [timeLimit, setTimeLimit] = useState(0);

//   useEffect(() => {
//     if (activePlayers.length > 0) {
//       setCurrentPlayer(activePlayers[currentPlayerIndex]);
//     }
//   }, [activePlayers, currentPlayerIndex]);

//   const getRandomQuestion = (type) => {
//     const questions = type === "truth" ? truths : dares;
//     const randomIndex = Math.floor(Math.random() * questions.length);
//     return questions[randomIndex];
//   };

//   const handleOptionSelect = (option) => {
//     setSelectedOption(option);
//     setTimeLimit(option === "truth" ? 40 : 80);
//     setCurrentQuestion(getRandomQuestion(option));
//     setGameStatus("question");
//   };

//   const handleTimeUp = () => {
//     handleResult(false);
//   };

//   const handleResult = (completed) => {
//     if (!completed) {
//       const eliminatedPlayer = activePlayers[currentPlayerIndex];
//       const updatedPlayers = activePlayers.filter((_, index) => index !== currentPlayerIndex);
      
//       setActivePlayers(updatedPlayers);
//       setEliminatedPlayers([...eliminatedPlayers, eliminatedPlayer]);

//       if (updatedPlayers.length === 1) {
//         setWinner(updatedPlayers[0]);
//         setTimeout(() => onGameEnd(updatedPlayers[0]), 3000);
//         return;
//       }

//       if (currentPlayerIndex >= updatedPlayers.length) {
//         setCurrentPlayerIndex(0);
//       }
//     }

//     const nextPlayerIndex = (currentPlayerIndex + 1) % activePlayers.length;
//     setCurrentPlayerIndex(nextPlayerIndex);
//     setCurrentPlayer(activePlayers[nextPlayerIndex]);
//     setGameStatus("select");
//     setSelectedOption(null);
//   };

//   if (winner) {
//     return (
//       <div className="winner-screen">
//         <h2>🎉 Champion! 🎉</h2>
//         <p className="winner-message">{winner} won the game!</p>
//         <div className="celebration">🏆✨👑</div>
//       </div>
//     );
//   }

//   return (
//     <div className="game-container">
//       <div className="game-screen">
//         {gameStatus === "select" && (
//           <div className="select-phase">
//             <h2>{currentPlayer}'s Turn</h2>
//             <p>Choose your challenge:</p>
//             <div className="option-buttons">
//               <button onClick={() => handleOptionSelect("truth")}>Truth</button>
//               <button onClick={() => handleOptionSelect("dare")}>Dare</button>
//             </div>
//           </div>
//         )}

//         {gameStatus === "question" && (
//           <div className="question-phase">
//             <h2>{currentPlayer}'s {selectedOption === "truth" ? "Truth" : "Dare"}</h2>
//             <Timer initialTime={timeLimit} onTimeUp={handleTimeUp} />
//             <div className="question">{currentQuestion}</div>
//             <div className="action-buttons">
//               <button onClick={() => handleResult(true)}>Completed</button>
//               <button onClick={() => handleResult(false)}>Not Completed</button>
//             </div>
//           </div>
//         )}
//       </div>

//       <div className="player-tracker">
//         <div className="active-players">
//           <h3>Active Players ({activePlayers.length})</h3>
//           <ul>
//             {activePlayers.map((player, index) => (
//               <li key={index} className={player === currentPlayer ? "current" : ""}>
//                 {player}
//                 {activePlayers.length === 1 && " 👑"}
//               </li>
//             ))}
//           </ul>
//         </div>
        
//         <div className="eliminated-players">
//           <h3>Eliminated Players ({eliminatedPlayers.length})</h3>
//           <ul>
//             {eliminatedPlayers.map((player, index) => (
//               <li key={index}>{player}</li>
//             ))}
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// }

import { useState, useEffect } from "react";
import { truths } from "../data/truths";
import { dares } from "../data/dares";
import Timer from "./Timer";

export default function GameScreen({ players, onGameEnd }) {
  const [activePlayers, setActivePlayers] = useState([...players]);
  const [eliminatedPlayers, setEliminatedPlayers] = useState([]);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [currentPlayer, setCurrentPlayer] = useState(players[0] || ""); // Initialize with first player
  const [selectedOption, setSelectedOption] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState("");
  const [gameStatus, setGameStatus] = useState("select");
  const [winner, setWinner] = useState(null);
  const [timeLimit, setTimeLimit] = useState(0);

  // Initialize current player and validate active players
  useEffect(() => {
    if (activePlayers.length > 0) {
      const validIndex = Math.min(currentPlayerIndex, activePlayers.length - 1);
      if (currentPlayerIndex !== validIndex) {
        setCurrentPlayerIndex(validIndex);
      }
      setCurrentPlayer(activePlayers[validIndex] || "");
    } else {
      // Handle case when all players are eliminated (shouldn't happen)
      setWinner(null);
      onGameEnd(null);
    }
  }, [activePlayers, currentPlayerIndex]);

  // Rest of your existing code remains the same...
  const getRandomQuestion = (type) => {
    const questions = type === "truth" ? truths : dares;
    const randomIndex = Math.floor(Math.random() * questions.length);
    return questions[randomIndex];
  };

  const handleOptionSelect = (option) => {
    if (!currentPlayer) return; // Guard clause
    
    setSelectedOption(option);
    setTimeLimit(option === "truth" ? 40 : 80);
    setCurrentQuestion(getRandomQuestion(option));
    setGameStatus("question");
  };

  const handleTimeUp = () => {
    handleResult(false);
  };

  const handleResult = (completed) => {
    if (!currentPlayer) return; // Guard clause

    if (!completed) {
      const eliminatedPlayer = activePlayers[currentPlayerIndex];
      const updatedPlayers = activePlayers.filter((_, index) => index !== currentPlayerIndex);
      
      setActivePlayers(updatedPlayers);
      setEliminatedPlayers([...eliminatedPlayers, eliminatedPlayer]);

      if (updatedPlayers.length === 1) {
        setWinner(updatedPlayers[0]);
        setTimeout(() => onGameEnd(updatedPlayers[0]), 3000);
        return;
      }

      if (currentPlayerIndex >= updatedPlayers.length) {
        setCurrentPlayerIndex(0);
      }
    }

    const nextPlayerIndex = (currentPlayerIndex + 1) % activePlayers.length;
    setCurrentPlayerIndex(nextPlayerIndex);
    setCurrentPlayer(activePlayers[nextPlayerIndex] || ""); // Ensure we don't set undefined
    setGameStatus("select");
    setSelectedOption(null);
  };

  // Add this to your WinnerScreen component
useEffect(() => {
  const createConfetti = () => {
    const confetti = document.createElement('div');
    confetti.className = 'confetti';
    confetti.style.left = `${Math.random() * 100}%`;
    confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
    confetti.style.animationDuration = `${Math.random() * 3 + 2}s`;
    document.querySelector('.winner-screen').appendChild(confetti);
    
    setTimeout(() => {
      confetti.remove();
    }, 5000);
  };

  const interval = setInterval(createConfetti, 100);
  return () => clearInterval(interval);
}, []);

  // Add validation in the render section
  if (!currentPlayer) {
    return (
      <div className="error-screen">
        <h2>Game Error</h2>
        <p>No active players found. Please restart the game.</p>
        <button onClick={() => onGameEnd(null)} className="restart-button">
          Return to Setup
        </button>
      </div>
    );
  }

  if (winner) {
    return (
      <div className="winner-screen">
        <h2>🎉 Champion! 🎉</h2>
        <p className="winner-message">{winner} won the game!</p>
        <div className="celebration">🏆✨👑</div>
      </div>
    );
  }

  return (
    <div className="game-container">
      <div className="game-screen">
        {gameStatus === "select" && (
          <div className="select-phase">
            <h2>{currentPlayer}'s Turn</h2>
            <p>Choose your challenge:</p>
            <div className="option-buttons">
              <button onClick={() => handleOptionSelect("truth")}>Truth</button>
              <button onClick={() => handleOptionSelect("dare")}>Dare</button>
            </div>
          </div>
        )}

        {gameStatus === "question" && (
          <div className="question-phase">
            <h2>{currentPlayer}'s {selectedOption === "truth" ? "Truth" : "Dare"}</h2>
            <Timer initialTime={timeLimit} onTimeUp={handleTimeUp} />
            <div className="question">{currentQuestion}</div>
            <div className="action-buttons">
              <button onClick={() => handleResult(true)}>Completed</button>
              <button onClick={() => handleResult(false)}>Not Completed</button>
            </div>
          </div>
        )}
      </div>

      <div className="player-tracker">
        <div className="active-players">
          <h3>Active Players ({activePlayers.length})</h3>
          <ul>
            {activePlayers.map((player, index) => (
              <li key={index} className={player === currentPlayer ? "current" : ""}>
                {player}
                {activePlayers.length === 1 && " 👑"}
              </li>
            ))}
          </ul>
        </div>
        
        <div className="eliminated-players">
          <h3>Eliminated Players ({eliminatedPlayers.length})</h3>
          <ul>
            {eliminatedPlayers.map((player, index) => (
              <li key={index}>{player}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}