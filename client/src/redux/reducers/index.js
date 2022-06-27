import { GET_ALL_POKEMON, GET_POKEMON_DETAIL, CREATE_POKEMON, GET_ALL_TYPES, FILTER_BY_TYPES, GET_POKEMON_BY_NAME, SORT_BY,FILTER_BY_ORIGIN } from '../actions/actionTypes';

const initialState = {
    pokemons: [],
    allPokemons: [],
    pokeDetail: {},
    types: [],
    pokeByName: {}
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
        case GET_POKEMON_BY_NAME: {
            return {
                ...state,
                pokeByName: action.payload
            }
        }
        case SORT_BY: {
            var parameters;
            console.log(action.payload)
            switch (action.payload) {
                case 'AZ':
                    parameters = function (a, b) {
                        if (a.name < b.name) {
                            return -1
                        }
                        if (a.name > b.name) {
                            return 1
                        }
                        return 0
                    }
                    break;
                case 'ZA':
                    parameters = function (a, b) {
                        if (a.name > b.name) {
                            return -1
                        }
                        if (a.name < b.name) {
                            return 1
                        }
                        return 0
                    }
                    break;
                case 'asc':
                    parameters = function (a, b) {
                        if (a.attack < b.attack) {
                            return -1
                        }
                        if (a.attack > b.attack) {
                            return 1
                        }
                        return 0
                    }
                    break;
                case 'desc':
                    parameters = function (a, b) {
                        if (a.attack > b.attack) {
                            return -1
                        }
                        if (a.attack < b.attack ) {
                            return 1
                        }
                        return 0
                    }
                    break;
                default:
                    break;
            }
            
            return {
                ...state,
                allPokemons: state.allPokemons.sort(parameters)
            }
        }
        case FILTER_BY_TYPES: {
            const pokemons = state.pokemons
            const statusFiltered = action.payload === 'All' ? pokemons : forInTypes();

            function forInTypes() {
                let newArray = [];
                for (let i in pokemons) {
                    pokemons[i].type.map((e) => {
                        if (e === action.payload) {
                            newArray.push(pokemons[i])
                        }
                    }
                    )
                }

                return newArray
            }
            return {
                ...state,
                allPokemons: statusFiltered
            }
        }
        case FILTER_BY_ORIGIN: {
            const pokemonsDB = state.pokemons
            console.log("hola",pokemonsDB)
            switch(action.payload){
                case 'all':
                    return {
                        ...state,
                        allPokemons: pokemonsDB
                    }
                case 'pokeApi': {
                    let newArray = [];
                    for (let i in pokemonsDB) {
                        console.log(pokemonsDB[i])
                        if(typeof pokemonsDB[i].id !== 'string'){
                            newArray.push(pokemonsDB[i])
                        } 
                    }
                    return {
                        ...state,
                        allPokemons: newArray
                    }
                }
                case 'created':
                    let newArray = [];
                    for (let i in pokemonsDB) {
                        console.log(pokemonsDB[i])
                        if(typeof pokemonsDB[i].id === 'string') newArray.push(pokemonsDB[i])                      
                    }
                    return {
                        ...state,
                        allPokemons: newArray
                    }
                    default:
                        break;
                }
            }
            default:
                return { ...state }
        }
            //////////////////////////////////////////////////////////////////////////////////
        //     const pokemonsFiltered = action.payload === 'all' ? pokemonsDB : forInOrigin();

        //     function forInOrigin() {
        //         let newArray = [];
        //         for (let i in pokemonsDB) {
        //             console.log(pokemonsDB[i])
        //             if(typeof pokemonsDB[i].id === 'string') newArray.push(pokemonsDB[i])                      
        //         }
        //         return newArray
        //     }
        //     return {
        //         ...state,
        //         allPokemons: pokemonsFiltered
        //     }
        // }
    
}
export default rootReducer;

