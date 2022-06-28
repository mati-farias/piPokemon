const axios = require('axios');
const db = require('./db.js');
const { Pokemon, Type } = require("./db.js");



const getPokemons = async function () {
  const api = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=5");
  const db = await Pokemon.findAll({
    include: {
      model: Type,
      attributes: ['name'],
      through: {
        attributes: []
      }
    }
  })
  
  var pokeList = []
  for (let i = 0; i < api.data.results.length - 1; i++) {
    let respuesta = await axios.get(api.data.results[i].url)
    pokeList.push({
      id: respuesta.data.id,
      name: respuesta.data.name,
      hp: respuesta.data.stats[0].base_stat,
      attack: respuesta.data.stats[1].base_stat,
      defense: respuesta.data.stats[2].base_stat,
      speed: respuesta.data.stats[5].base_stat,
      height: respuesta.data.height,
      weight: respuesta.data.weight,
      types: respuesta.data.types.map(e => e.type.name),
      img: respuesta.data.sprites.versions["generation-v"]["black-white"].animated.front_default,
    })
 
  }
  let newDB = db.map(e => {
    return {
      id: e.id,
      name: e.name,
      hp: e.hp,
      attack: e.attack,
      defense: e.defense,
      speed: e.speed,
      height: e.height,
      weight: e.weight,
      types: e.types.map(e => e.name)
    }
  })
  
  pokeList = [...pokeList, ...newDB]


  return pokeList

}
const getPokemonById = async function (id) {
  let poke = {}
  let respuesta = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
  console.log("methods", respuesta.data.types[0].type.name)
  poke = {
    id: respuesta.data.id,
    name: respuesta.data.name,
    hp: respuesta.data.stats[0].base_stat,
    attack: respuesta.data.stats[1].base_stat,
    defense: respuesta.data.stats[2].base_stat,
    speed: respuesta.data.stats[5].base_stat,
    height: respuesta.data.height,
    weight: respuesta.data.weight,
    types: respuesta.data.types.map(e => e.type.name),
    img: respuesta.data.sprites.versions["generation-v"]["black-white"].animated.front_default,
  }
  return poke
}

const getPokemonByName = async function (name) {
  let poke = {}
  let finalName;

  let db = await Pokemon.findAll({where: {name: name},  
    include: {
        model: Type,
        attributes: ['name'],
        through: {
          attributes: []
        }
     }})
     console.log(db[0])
     if(db[0]){
      return db
    }
    else {
      let respuesta = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
      let nameAPI = respuesta.data
      
      if (nameAPI){
        finalName = nameAPI
      }
    }

  poke = [{
    id: finalName.id,
    name: finalName.name,
    hp: finalName.stats[0].base_stat,
    attack: finalName.stats[1].base_stat,
    defense: finalName.stats[2].base_stat,
    speed: finalName.stats[5].base_stat,
    height: finalName.height,
    weight: finalName.weight,
    types: finalName.types.map(e => e.type? e.type.name : e.name),
    img: finalName.sprites.versions["generation-v"]["black-white"].animated.front_default,
  }]
  return poke
}



module.exports = {
  getPokemons,
  getPokemonByName,
  getPokemonById,
}
