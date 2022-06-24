import React,{useEffect} from 'react'

import Pokemon from '../Pokemon/Pokemon'
import { useSelector } from 'react-redux';


const PokeList = (currentPokemons) => {

    

   

    console.log("currentPokemons",currentPokemons)

    return (
        <div>
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