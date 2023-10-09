export default function SearchResults({ pokemon, handleSearch }) {
  const pokemonSearchResults = pokemon.map((onePokemon) => {
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
