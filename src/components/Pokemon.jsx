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
