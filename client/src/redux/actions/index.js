import {GET_ALL_POKEMON, GET_POKEMON_DETAIL,CREATE_POKEMON,GET_ALL_TYPES} from './actionTypes';
const axios = require('axios');


export const getAllPokemon = () => {
    return async function (dispatch) {
        let pokemons = await axios.get('http://localhost:3001/pokemons/')
        console.log(pokemons.data)
        return dispatch({type: GET_ALL_POKEMON, payload: pokemons.data})
    }
}

// export const GET_POKEMON_DETAIL = () => {
//     return async function(dispatch) => {

//     }
// }
