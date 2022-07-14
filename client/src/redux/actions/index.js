import { GET_ALL_POKEMON, GET_POKEMON_DETAIL, CREATE_POKEMON, GET_ALL_TYPES, FILTER_BY_TYPES, GET_POKEMON_BY_NAME, SORT_BY, FILTER_BY_ORIGIN, SET_POKEMON_DETAILS,LOADING} from './actionTypes';
const axios = require('axios');


export const getAllPokemon = () => {
    return async function (dispatch) {
        dispatch({
            type: LOADING
        })
        let pokemons = await axios.get('http://localhost:3001/pokemons/')
        return dispatch({ type: GET_ALL_POKEMON, payload: pokemons.data })
    }
}
export const getPokemonDetail = (id) => {
    return async function (dispatch) {
        try{
            let pokemon = await axios.get(`http://localhost:3001/pokemons/${id}`)
            return dispatch({ type: GET_POKEMON_DETAIL, payload: pokemon.data })
        }catch(err){
            alert("pokemon no encontrado")
            window.location.href="/";
        }
    }
}

export const getAllTypes = () => {
    return async function (dispatch) {
        let types = await axios.get('http://localhost:3001/types/')
        return dispatch({ type: GET_ALL_TYPES, payload: types.data })
    }
}

export const filterByTypes = (payload) => {
    return {
        type: FILTER_BY_TYPES,
        payload
    }
}

export const filterByOrigin = (payload) => {
    return async function (dispatch) {
        dispatch({
            type: FILTER_BY_ORIGIN,
            payload
        })
    }
}

export const getPokemonByName = (name) => {
    return async function (dispatch) {
        return await axios.get(`http://localhost:3001/pokemons?name=${name}`)
            .then(pokemon => dispatch({ type: GET_POKEMON_BY_NAME, payload: pokemon.data }))
            .catch(error => alert("No existe ese pokemon!"))
    }
}

export const sortBy = (payload) => {
    return async function (dispatch) {
        return dispatch({ type: SORT_BY, payload: payload })
    }
}

export const createPokemon = (payload) => {
    return function (dispatch) {
        let response = axios.post('http://localhost:3001/pokemons/', payload)
        return dispatch({ type: CREATE_POKEMON, payload: response.data })
    }
}

export const setPokemonDetails = () => {
    return {
        type: SET_POKEMON_DETAILS
    }
}
