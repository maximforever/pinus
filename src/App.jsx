import { useState } from "react";
import Search from "./components/Search";

function App() {
  const [searchResults, setSearchResults] = useState([]);

  function renderSearchResults() {
    return <div>I'm some pokemon</div>;
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
        const matches = res.results.filter((pokemon) =>
          pokemon.name.toLowerCase().includes(query.toLowerCase())
        );

        // save API call to state
        console.log(matches);
        setSearchResults(matches);
      });
  }

  return (
    <div>
      <h1 id="heading">Welcome to Pinus!</h1>
      <h2 id="subheading">(Pinus is Pokemon Linus)</h2>
      <Search placeholder="look up pokemon" handleSearch={searchForPokemon} />
      {renderSearchResults()}
    </div>
  );
}

export default App;
