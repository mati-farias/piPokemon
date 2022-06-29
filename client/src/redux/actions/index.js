import {GET_ALL_POKEMON, GET_POKEMON_DETAIL,CREATE_POKEMON,GET_ALL_TYPES,FILTER_BY_TYPES,GET_POKEMON_BY_NAME, SORT_BY, FILTER_BY_ORIGIN} from './actionTypes';
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

export const filterByTypes = (payload) =>{
    return {
        type: FILTER_BY_TYPES,
        payload
    }
}

export const filterByOrigin = (payload) => {
    return async function (dispatch){
        dispatch({
            type: FILTER_BY_ORIGIN,
            payload
        })
    }
}

export const getPokemonByName = (name) => {
    return async function(dispatch){
        let pokemon = await axios.get(`http://localhost:3001/pokemons?name=${name}`)
        return dispatch({type: GET_POKEMON_BY_NAME, payload: pokemon.data})
    }
}

export const sortBy = (payload) => {
   return async function (dispatch) {
    return dispatch({type: SORT_BY, payload: payload})
   }
}

export const createPokemon = (payload) => {
    return function (dispatch){
        let response = axios.post('http://localhost:3001/pokemons/', payload)
        return dispatch({type: CREATE_POKEMON, payload: response.data})
    }
}
