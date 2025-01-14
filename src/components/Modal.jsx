import { createPortal } from "react-dom";

export default function Modal({ resetGame, message }) {
  let endText = "Game over.";
  if (message) {
    endText = "Game won!";
  }
  return createPortal(
    <section id="game_over_modal">
      <h2>{endText}</h2>
      <button onClick={() => resetGame()}>Retry</button>
    </section>,
    document.body
  );
}
