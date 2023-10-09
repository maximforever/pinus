import { useState } from "react";
import Search from "./components/Search";
import Pokemon from "./components/Pokemon";
import SearchResults from "./components/SearchResults";
import { cleanedUpPokemonData } from "./lib/pokemonUtils";

function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [pokemon, setPokemon] = useState([]);

  function getDataForOnePokemon(pokemonToLookUp) {
    const currentPokemonNames = pokemon.map((onePokemon) => onePokemon.name);
    if (currentPokemonNames.includes(pokemonToLookUp.name)) {
      return;
    }

    fetch(pokemonToLookUp.url)
      .then((res) => res.json())
      .then((res) => {
        const pokemonData = cleanedUpPokemonData(res);
        setPokemon(pokemon.concat(pokemonData));
      });
  }

  function searchForPokemon(query) {
    const url = "https://pokeapi.co/api/v2/pokemon?limit=251";

    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        const matches = res.results.filter((pokemon) =>
          pokemon.name.toLowerCase().includes(query.toLowerCase())
        );

        setSearchResults(matches);
      });
  }

  function renderPokemon() {
    if (!pokemon.length) {
      return null;
    }

    const pokemonCards = pokemon.map((onePokemon) => {
      return <Pokemon key={onePokemon.id} pokemon={onePokemon} />;
    });

    return <div className="card">{pokemonCards}</div>;
  }

  return (
    <div>
      <h1 id="heading">Welcome to Pinus!</h1>
      <h2 id="subheading">(Pokemon Linus)</h2>

      <Search placeholder="look up pokemon" handleSearch={searchForPokemon} />
      <SearchResults
        pokemon={searchResults}
        handleSearch={getDataForOnePokemon}
      />
      {renderPokemon()}
    </div>
  );
}

export default App;
