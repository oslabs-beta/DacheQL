
const pokemonAPIEndpoint = (pokemon) => `https://pokeapi.co/api/v2/pokemon/slowpoke`;

fetch(pokemonAPIEndpoint, {
  method: 'POST',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify({
    query: `{
            pokemon {
                species.name,
                abilities.0.ability,
                types.0.type.name,
                types.1.type.name,
            }
        }`
  })
})
  .then(res => res.json())
  .then(res => console.log(res.data));

// const pokemon = 'slowpoke';
// const pokeData = getPokemon(pokemon);
// console.log(pokeData, 'pokeData');
process.exit();