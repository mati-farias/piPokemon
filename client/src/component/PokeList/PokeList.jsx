import React from 'react'
import Pokemon from '../Pokemon/Pokemon'
import './PokeList.css'
import imgDefault from '../../images/pokeball-png-45342.png'


const PokeList = (currentPokemons) => {

    
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