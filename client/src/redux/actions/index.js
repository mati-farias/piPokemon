import {GET_ALL_POKEMON, GET_POKEMON_DETAIL,CREATE_POKEMON,GET_ALL_TYPES,FILTER_BY_TYPES} from './actionTypes';
const axios = require('axios');


export const getAllPokemon = () => {
    return async function (dispatch) {
        let pokemons = await axios.get('http://localhost:3001/pokemons/')
        console.log(pokemons.data)
        return dispatch({type: GET_ALL_POKEMON, payload: pokemons.data})
    }
}
export const getPokemonDetail = (id) => {
    return async function(dispatch){
        let pokemon = await axios.get(`http://localhost:3001/pokemons/${id}`)
        return dispatch({type: GET_POKEMON_DETAIL, payload: pokemon.data})
    }
}

export const getAllTypes = () => {
    return async function (dispatch) {
        let types = await axios.get('http://localhost:3001/types/')
        return dispatch({type:GET_ALL_TYPES , payload: types.data })
    }
}

export function filterByTypes(payload){
    console.log(payload)
    return {
        type: FILTER_BY_TYPES,
        payload
    }
}
