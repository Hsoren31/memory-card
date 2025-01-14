/* Here we will retrieve the pokemon data */
import { useEffect, useState } from "react";
import Card from "./Card";
import Scoreboard from "./Scoreboard";
import Modal from "./Modal";

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
  const [pokemonData, setPokemonData] = useState([]);
  const [clickedPokemon, setClickedPokemon] = useState([]);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [gameWon, setGameWon] = useState(false);

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

        setPokemonData(results);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchData();
  }, []);

  function shufflePokemon() {
    const shuffled = shuffleArray(pokemonData);
    setPokemonData(shuffled);
  }

  function gameOver() {
    if (score > bestScore) {
      setBestScore(score);
    }
    setShowModal(true);
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
    setShowModal(false);
    setClickedPokemon([]);
    setScore(0);
    setGameWon(false);
  }

  return (
    <>
      <Scoreboard score={score} bestScore={bestScore} />
      <div id="game_board">
        {pokemonData.map((pokemon) => (
          <Card {...pokemon} key={pokemon.id} handleClick={handleClick} />
        ))}
      </div>
      {showModal && <Modal resetGame={resetGame} message={gameWon} />}
    </>
  );
}

export { Game };
