import { GET_ALL_POKEMON, GET_POKEMON_DETAIL, CREATE_POKEMON, GET_ALL_TYPES,FILTER_BY_TYPES } from '../actions/actionTypes';

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
                allPokemons: action.payload,
                pokemons: action.payload
            }
        }
        case GET_POKEMON_DETAIL: {
            console.log("hola",action.payload)
            return {
                ...state,
                pokeDetail: action.payload
            }
        }
        case GET_ALL_TYPES: {
            return {
                ...state,
                types: action.payload
            }
        }
        case FILTER_BY_TYPES:{
            const pokemons = state.pokemons
            const statusFiltered = action.payload === 'All' ? pokemons : forInTypes();

            function forInTypes(){
                let newArray = [];
                for (let i in pokemons){
                    pokemons[i].type.map((e) => {
                            if(e === action.payload){
                                newArray.push(pokemons[i])
                            }
                        }
                    )       
                    }
                    console.log(newArray)
                    return newArray
                }
                console.log("statusFiltered",statusFiltered)
            return{
                ...state,
                allPokemon: statusFiltered
            }
        }
        default:
            return {...state}
    }
}
export default rootReducer;

