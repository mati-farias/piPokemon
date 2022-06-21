const axios = require('axios')
const { Pokemon, Type } = require("./db.js");

const getPokemons = async function() {
  const api = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=5");
  const db = await Pokemon.findAll({include: Type})

  var pokeList = []
  for (let i = 0; i<api.data.results.length-1;i++){
    let respuesta = await axios.get(api.data.results[i].url)
    
    pokeList.push({
      id: respuesta.data.id,
      name: respuesta.data.name,
      hp: respuesta.data.stats[0].base_stat,
      attack: respuesta.data.stats[1].base_stat,
      defense:respuesta.data.stats[2].base_stat,
      speed:respuesta.data.stats[5].base_stat,
      height:respuesta.data.height,
      weight:respuesta.data.weight,
      img: respuesta.data.sprites.versions["generation-v"]["black-white"].animated.front_default, 
    })
  }
  pokeList = [...pokeList, ...db]
 


  
  return pokeList

}
const getPokemonById = async function(id) {
  let poke = {}
  let respuesta = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
  poke = {
      id: respuesta.data.id,
      name: respuesta.data.name,
      hp: respuesta.data.stats[0].base_stat,
      attack: respuesta.data.stats[1].base_stat,
      defense:respuesta.data.stats[2].base_stat,
      speed:respuesta.data.stats[5].base_stat,
      height:respuesta.data.height,
      weight:respuesta.data.weight,
      img: respuesta.data.sprites.versions["generation-v"]["black-white"].animated.front_default,
  }
  return poke
}

const getPokemonByName = async function(name) {
  let poke = {}
  let respuesta = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
  console.log(respuesta)
  poke = {
    id: respuesta.data.id,
    name: respuesta.data.name,
    hp: respuesta.data.stats[0].base_stat,
    attack: respuesta.data.stats[1].base_stat,
    defense:respuesta.data.stats[2].base_stat,
    speed:respuesta.data.stats[5].base_stat,
    height:respuesta.data.height,
    weight:respuesta.data.weight,
    img: respuesta.data.sprites.versions["generation-v"]["black-white"].animated.front_default,
  }
  return poke
}

module.exports = {
  getPokemons,
  getPokemonByName,
  getPokemonById
}
