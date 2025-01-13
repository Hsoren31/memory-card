/* Here we will retrieve the pokemon data */
import Card from "./components/Card";

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

/*Get data from each pokemon in PokemonList */

async function getPokemonData() {
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
        return {
          ...pokemon,
          name: pokemon.name,
          imgUrl: json.sprites.front_default,
        };
      })
    );

    console.log(results);

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
  } catch (error) {
    console.error(error.message);
  }
}

export { getPokemonData };
