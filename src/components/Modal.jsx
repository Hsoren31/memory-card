import { createPortal } from "react-dom";

export default function Modal({ resetGame, message }) {
  let endText = "Game over.";
  if (message) {
    endText = "Game won!";
  }
  return createPortal(
    <section id="modal_bg">
      <div id="modal">
        <h2>{endText}</h2>
        <button id="reset_game_btn" onClick={() => resetGame()}>
          Retry
        </button>
      </div>
    </section>,
    document.body
  );
}
