/*
Display instructions, scoreboard, and board full of cards

Board will display cards in random order
Click triggers scoreboard update and reshuffle
Repeat till user clicks on the same card twice
Game over message displays
*/

import { getPokemonData } from "./Pokemon";
import Card from "./Card";

function Board() {
  const pokemonResult = getPokemonData();
  console.log(pokemonResult);
  return (
    <div>
      {pokemonResult.map((pokemon) => (
        <Card {...pokemon} key={pokemon.id} />
      ))}
    </div>
  );
}

export { Board };
