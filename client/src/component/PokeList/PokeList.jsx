import React,{useEffect} from 'react'
import Pokemon from '../Pokemon/Pokemon'
import { useSelector } from 'react-redux';
import './PokeList.css'


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
                            img={p.img}
                            name={p.name}
                            types={p.type}
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