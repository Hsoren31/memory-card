/* Here we will retrieve the pokemon data */
import { useEffect, useState } from "react";

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

function getPokemonData() {
  const [pokemonData, setPokemonData] = useState([]);

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

  return pokemonData;
}

export { getPokemonData };
