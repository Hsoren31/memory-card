import { createPortal } from "react-dom";

export default function IntroModal({ close }) {
  return createPortal(
    <div className="modal-bg">
      <div className="modal">
        <h2>Welcome!</h2>
        <p>
          Memory Card is a game to test your memory. You will be presented with
          a deck of Pokemon characters. Your goal is to select all of them just
          once. The trick is that once you select a character the deck will be
          shuffled.
        </p>
        <div className="how-to-play">
          <h3>How to Play:</h3>
          <p>
            Click on any of the Pokemon to start the game. The game will end if
            you successfully select all of the Pokemon once.
          </p>
        </div>
        <button id="start" onClick={close}>
          Start Game
        </button>
      </div>
    </div>,
    document.body
  );
}
