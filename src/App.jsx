import { useState } from "react";
import Search from "./components/Search";
import Pokemon from "./components/Pokemon";

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
        setPokemon(pokemon.concat(res));
      });
  }

  function searchForPokemon(query) {
    /*
      This is a little different than Linus.
      There are only 1292 pokemon in total, so rather than asking the server to search by query,
      We'll only query for the first 251 pokemon, which covers Generation I and II.
      we get the whole list of pokemon, and return only the pokemon that match.
      A pokemon matches the query if its name contains the query (ex: 'Pikachu' contains 'ach')

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

  function renderSearchResults() {
    /*
      Arrow functions are common for map/filter
      Note the `key` attribute on the <p>.
      Anytime we map, react need us to give every item in the list an ID (so it could re-render the list quicky)
      Otherwise, you'll see a console error. This is a common thing to miss.
      The key should be any unique property. In our case, every pokemon will have a different name.
    */
    const pokemonSearchResults = searchResults.map((pokemon) => {
      return (
        // note the `() => getDataForOnePokemon(pokemon.url)`
        // if we just did `getDataForOnePokemon(pokemon.url)`, the function would run immediately, not onClick

        // finally, this is gonna look like a link, even though it's not - check the CSS!
        <p
          key={pokemon.name}
          onClick={() => getDataForOnePokemon(pokemon)}
          className="search-result"
        >
          {pokemon.name}
        </p>
      );
    });

    return (
      <div className="card">
        <h4>Search results:</h4>
        {/*
          this is a common thing to do - a chunk of your component can live in its own
          return function or variable, as long as they return JSX (which is "react HTML")
        */}
        {pokemonSearchResults}
      </div>
    );
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
      <h2 id="subheading">(Pinus is Pokemon Linus)</h2>
      <Search placeholder="look up pokemon" handleSearch={searchForPokemon} />
      {/*
          this is a common thing to do - a chunk of your app can live in its own
          return function or variable, as long as they return JSX (which is "react HTML")
        */}
      {renderSearchResults()}
      {renderPokemon()}
    </div>
  );
}

export default App;
