import { useState } from "react";
import Search from "./components/Search";
import Pokemon from "./components/Pokemon";
import SearchResults from "./components/SearchResults";
import { cleanedUpPokemonData } from "./lib/pokemonUtils";

function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [pokemon, setPokemon] = useState([]);

  function getDataForOnePokemon(pokemonToLookUp) {
    // If we are already showing this pokemon, we don't want to show it again
    // So, let's check for that upfront

    // also, this is naming is awkward ¯\_(ツ)_/¯
    // `pokemon` are all the pokemon in state.
    // `pokemonToLookUp` is the pokemon we're gonna search for
    // `onePokemon` is the singular of `pokemon`
    const currentPokemonNames = pokemon.map((onePokemon) => onePokemon.name); // an array of all the pokemon names
    if (currentPokemonNames.includes(pokemonToLookUp.name)) {
      return;
    }

    // if we don't return above ("guard clause"), then we fetch. No need for an "else"!

    fetch(pokemonToLookUp.url)
      .then((res) => res.json())
      .then((res) => {
        // we never mutate the state object directly!
        //we use setPokemon and give it a copy of the array (`concat` doesn't mutate the array)
        const pokemonData = cleanedUpPokemonData(res);
        setPokemon(pokemon.concat(pokemonData));
      });
  }

  function searchForPokemon(query) {
    /*
      This is a little different than Linus.
      There are only 1292 pokemon in Gen I and II.
      So rather than asking the server to search by query, we'll get all the first 251 pokemon.
      Then we filter it down to only return pokemon that match.
      A pokemon matches the query if its name contains the query (ex: 'Pikachu' contains 'kach')

      The API doesn't need auth, so you can see the raw response by navigating to https://pokeapi.co/api/v2/pokemon?limit=251
    */

    const url = "https://pokeapi.co/api/v2/pokemon?limit=251";

    // fetch the response, parse it as JSON, then filter it down
    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        // of the 251 pokemon we get, only show ones whose names contain the query (everything lowercased)
        // arrow functions are common for map/filter
        const matches = res.results.filter((pokemon) =>
          pokemon.name.toLowerCase().includes(query.toLowerCase())
        );

        // save API call to state
        console.log(matches);
        setSearchResults(matches);
      });
  }

  function renderPokemon() {
    if (!pokemon.length) {
      return null;
    }

    /*
      Note this pattern - we have an array of pokemon, we map over it, and render one component per array element.
      This is super common!
      Note that every element in a map needs a unique key attribute
    */

    const pokemonCards = pokemon.map((onePokemon) => {
      return <Pokemon key={onePokemon.id} pokemon={onePokemon} />;
    });

    return <div className="card">{pokemonCards}</div>;
  }

  return (
    <div>
      <h1 id="heading">Welcome to Pinus!</h1>
      <h2 id="subheading">(Pokemon Linus)</h2>
      {/*
          this is a common thing to do - a chunk of your app can live in its own
          return function or variable, as long as they return JSX (which is "react HTML")
        */}
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
