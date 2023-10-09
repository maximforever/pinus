export default function SearchResults({ pokemon, handleSearch }) {
  const pokemonSearchResults = pokemon.map((onePokemon) => {
    /*
        Arrow functions are common for map/filter
        Note the `key` attribute on the <p>.
        Anytime we map, react need us to give every item in the list an ID (so it could re-render the list quicky)
        Otherwise, you'll see a console error. This is a common thing to miss.
        The key should be any unique property. In our case, every pokemon will have a different name.

        Also note the `(() => getDataForOnePokemon(pokemon.url))` in the onClick
        if we just did `getDataForOnePokemon(pokemon.url)`, the function would run immediately, not onClick

        Finally, each pokemon name is gonna look like a link, even though it's not - check the CSS!
    */
    return (
      <p
        key={onePokemon.name}
        onClick={() => handleSearch(onePokemon)}
        className="search-result"
      >
        {onePokemon.name}
      </p>
    );
  });

  if (!pokemon.length) {
    return null;
  }

  return (
    <div className="card">
      <h4>Search results:</h4>
      {pokemonSearchResults}
    </div>
  );
}
