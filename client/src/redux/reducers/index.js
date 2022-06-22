import { GET_ALL_POKEMON, GET_POKEMON_DETAIL, CREATE_POKEMON, GET_ALL_TYPES } from '../actions/actionTypes';

const initialState = {
    pokemons: [],
    allPokemons: [],
    pokeDetail: {},
    types: []
}

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_POKEMON: {
            return {
                ...state,
                allPokemons: action.payload
            }
        }
        default:
            return {...state}
    }
}
export default rootReducer;

