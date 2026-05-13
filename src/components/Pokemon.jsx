/* Here we will retrieve the pokemon data */
import { useEffect, useState } from "react";
import Modal from "./Modal";
import Card from "./Card";
import Scoreboard from "./Scoreboard";

const PokemonList = [
  "pikachu",
  "charizard",
  "squirtle",
  "spoink",
  "tyranitar",
  "blastoise",
  "politoed",
  "cradily",
  "diglett",
  "magnemite",
  "klefki",
  "gloom",
  "seel",
  "muk",
  "spheal",
].map((name) => ({
  id: crypto.randomUUID(),
  name,
}));

function shuffleArray(array) {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = newArray[i];
    newArray[i] = newArray[j];
    newArray[j] = temp;
  }

  return newArray;
}

/*Get data from each pokemon in PokemonList */

function Game() {
  const [showIntroModal, setShowIntroModal] = useState(true);
  const [pokemonData, setPokemonData] = useState([]);
  const [clickedPokemon, setClickedPokemon] = useState([]);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [showEndGame, setShowEndGame] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const results = await Promise.all(
          PokemonList.map(async (pokemon) => {
            const response = await fetch(
              `https://pokeapi.co/api/v2/pokemon/${pokemon.name}/`,
              {
                mode: "cors",
              }
            );
            const json = await response.json();
            if (!response.ok) {
              throw new Error(`Response status: ${response.status}`);
            }
            return {
              ...pokemon,
              imageUrl: json.sprites.front_default,
            };
          })
        );
        setLoading(false);
        setPokemonData(results);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchData();
  }, []);

  function closeIntroModal() {
    setShowIntroModal(false);
  }

  function shufflePokemon() {
    const shuffled = shuffleArray(pokemonData);
    setPokemonData(shuffled);
  }

  function gameOver() {
    if (score > bestScore) {
      setBestScore(score);
    }
    setShowEndGame(true);
  }

  function handleClick({ id }) {
    const isPresent = clickedPokemon.some((obj) => obj.id === id);
    if (isPresent) {
      gameOver();
      return;
    }
    setScore(score + 1);
    if (score === 14) {
      setGameWon(true);
      gameOver();
      setBestScore(15);
    }
    setClickedPokemon([...clickedPokemon, { id }]);
    shufflePokemon();
  }

  function resetGame() {
    setShowEndGame(false);
    setClickedPokemon([]);
    setScore(0);
    setGameWon(false);
  }

  if (loading) {
    return <h3 id="loading">Loading...</h3>;
  }

  return (
    <>
      {showIntroModal && (
        <Modal openModal={showIntroModal} closeModal={closeIntroModal}>
          <h2>Welcome!</h2>
          <p>
            Memory Card is a game to test your memory. You will be presented
            with a deck of Pokemon characters. Your goal is to select all of
            them just once. The trick is that once you select a character the
            deck will be shuffled.
          </p>
          <div className="how-to-play">
            <h3>How to Play:</h3>
            <p>
              Click on any of the Pokemon to start the game. The game will end
              if you successfully select all of the Pokemon once.
            </p>
          </div>
        </Modal>
      )}
      <Scoreboard score={score} bestScore={bestScore} />
      <div id="game_board">
        {pokemonData.map((pokemon) => (
          <Card {...pokemon} key={pokemon.id} handleClick={handleClick} />
        ))}
      </div>
      {showEndGame && (
        <Modal openModal={showEndGame} closeModal={resetGame}>
          <p>{gameWon ? "Game Won!!" : "Game Over."}</p>
        </Modal>
      )}
    </>
  );
}

export { Game };
