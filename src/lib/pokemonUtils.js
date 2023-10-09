// clean up giant pokemon object to just the stuff we need
export function cleanedUpPokemonData(pokemon) {
  const stats = pokemon.stats.map((stats) => {
    return {
      name: stats.stat.name,
      value: stats.base_stat,
    };
  });

  const cleanedUpData = {
    name: pokemon.name,
    avatar: pokemon.sprites.front_default,
    stats: stats,
  };

  return cleanedUpData;
}
