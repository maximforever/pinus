/*
  Components take props objects, so you could also define this as `Pokemon(props)` where props is an object
  that looks like {pokemon: <pokemonObject>}.
  Then you'd call props.pokemon
  We're `destructuring` pokemon from props - this is a common pattern
 */
export default function Pokemon({ pokemon }) {
  function renderStats() {
    return pokemon.stats.map((stats) => {
      return (
        <span>
          {stats.name}: {stats.value}
        </span>
      );
    });
  }

  return (
    <div className="card">
      <img src={pokemon.avatar} />
      <h4 className="pokemon-name">{pokemon.name}</h4>
      <div className="stats-wrapper">{renderStats()}</div>
    </div>
  );
}
