import React from 'react'
import { Link } from 'react-router-dom'
import './Pokemon.css'

const Pokemon = (props) => {
    let {img,name,types,id} = props
  return (
    <div className="pokemon">
        <ul className='list'>
            <li >
                <div className='card'>
                    <div>
                        <img className="pokeImg" src={img} alt="imagen pokemon"/>
                    </div>
                    <div>
                        <Link to={`home/${id}`} className="link"><h3 className='name'>{name}</h3></Link>
                        <h4 className='types'>
                        {
                            types.map(t => t + " ") 
                        }
                        </h4>
                    </div>
                </div>
            </li>
        </ul>
    </div>
  )
}

export default Pokemon