/* Score board keeps track of the current score and saves the users best score */

export default function Scoreboard({ score, bestScore }) {
  return (
    <div id="scoreboard">
      <b>Current Score:</b>
      <p>{score}</p>
      <b>Best Score:</b>
      <p>{bestScore}</p>
    </div>
  );
}
