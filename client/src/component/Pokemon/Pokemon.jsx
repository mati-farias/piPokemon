import React from 'react'
import { Link } from 'react-router-dom'
import './Pokemon.css'

const Pokemon = (props) => {
    let { img, name, types, id } = props

    name = name.charAt(0).toUpperCase() + name.slice(1)
    return (
        <div className="pokemon">
            <ul className='list'>
                <Link to={`home/${id}`} className="link">
                    <li>
                        <div className='card'>
                            <div>
                                <img className="pokeImg" src={img} alt="imagen pokemon" />
                            </div>
                            <div>
                                <h3 className='name'>{name}</h3>
                                <h4 className='types'>
                                    {
                                        types.map(t => t.name? t.name + " " : t + " ")
                                    }
                                </h4>
                            </div>
                        </div>
                    </li>
                </Link>
            </ul>
        </div>
    )
}

export default Pokemon