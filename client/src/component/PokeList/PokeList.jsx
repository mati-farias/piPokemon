import React,{useEffect} from 'react'
import Pokemon from '../Pokemon/Pokemon'
import { useSelector } from 'react-redux';
import './PokeList.css'
import imgDefault from '../../images/poke_default.png'


const PokeList = (currentPokemons) => {

    // let currentPokemons = useSelector(state => state.allPokemons)
    console.log("pokelist",currentPokemons.currentPokemons)
    // useEffect(() => {
    //     console.log(currentPokemons)
    //   }, [currentPokemons])
    
    return (
        <div className='pokelist'>
            {currentPokemons.currentPokemons?.map(p => {
                return (
                    <div key={p.id}>
                        <Pokemon
                            id={p.id}
                            img= {p.img ? p.img : imgDefault}
                            name={p.name}
                            types={p.types}
                        />                      
                    </div>
                )
            }
            )
            }
        </div>
    )
}

export default PokeList