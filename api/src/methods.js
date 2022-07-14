const axios = require('axios');
const db = require('./db.js');
const { Pokemon, Type } = require("./db.js");



const getPokemons = async function () {
  const api = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=40");
  // const first20 = await axios.get('https://pokeapi.co/api/v2/pokemon%27')
  // const second20 = await axios.get(first20.data.next)
  // const totalPokeApi = first20.data.results.concat(second20.data.results)
  const db = await Pokemon.findAll({
    include: {
      model: Type,
      attributes: ['name'],
      through: {
        attributes: []
      }
    }
  })

  let infoUrl = api.data.results.map(e => axios.get(e.url))
 

  let pokeInfo = await Promise.all(infoUrl)
    .then(values => {
      let pokemon = values.map(e => e.data)
      let info = []
      pokemon.map(e => {
        info.push({
          id: e.id,
          name: e.name,
          hp: e.stats[0].base_stat,
          attack: e.stats[1].base_stat,
          defense: e.stats[2].base_stat,
          speed: e.stats[5].base_stat,
          height: e.height,
          weight: e.weight,
          types: e.types.map(e => e.type.name),
          img: e.sprites.other["official-artwork"].front_default
        })
      })
      return info
    })

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
      types: e.types.map(e => e.name),
      img: e.img,
      createdBy: e.createdBy
    }
  })

  let pokeList = [...pokeInfo, ...newDB]


  return pokeList

}
const getPokemonById = async function (id) {
  let poke = {}
  let respuesta = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
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
    img: respuesta.data.sprites.other["official-artwork"].front_default,
    // img: respuesta.data.sprites.versions["generation-v"]["black-white"].animated.front_default,
  }
  return poke
}

const getPokemonByName = async function (name) {
  let poke = {}
  let finalName;

  let db = await Pokemon.findAll({
    where: { name: name },
    include: {
      model: Type,
      attributes: ['name'],
      through: {
        attributes: []
      }
    }
  })
  if (db[0]) {
    return db
  }
   else {
     let respuesta = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
     let nameAPI = respuesta.data
  // else {
  //   let respuesta = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
  //   let nameAPI = respuesta.data

  //   return axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
  //   .then(data => ({
  //     id: data.id,
  //     name: data.name,
  //   }))

    if (nameAPI) {
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
    types: finalName.types.map(e => e.type ? e.type.name : e.name),
    img: finalName.sprites.other["official-artwork"].front_default,
    // img: finalName.sprites.versions["generation-v"]["black-white"].animated.front_default,
  }]
  return poke
}



module.exports = {
  getPokemons,
  getPokemonByName,
  getPokemonById,
}
