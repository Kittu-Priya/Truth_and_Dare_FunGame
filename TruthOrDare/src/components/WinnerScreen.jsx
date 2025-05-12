export default function WinnerScreen({ winner, onRestart }) {
  return (
    <div className="winner-screen">
      <h2>🎉 Champion! 🎉</h2>
      <p className="winner-message">{winner} won the game!</p>
      <div className="celebration">🏆✨👑</div>
      <button onClick={onRestart} className="restart-button">Play Again</button>
    </div>
  );
}