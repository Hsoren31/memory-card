/* Score board keeps track of the current score and saves the users best score */

export default function Scoreboard({ score, bestScore }) {
  return (
    <div id="scoreboard">
      <div>
        <b>Current Score:</b>
        <p>{score}</p>
      </div>
      <div>
        <b>Best Score:</b>
        <p>{bestScore}</p>
      </div>
    </div>
  );
}
