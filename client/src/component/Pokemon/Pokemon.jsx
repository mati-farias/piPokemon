import React from 'react'
import { Link } from 'react-router-dom'

const Pokemon = (props) => {
    let {img,name,types,id} = props
  return (
    <div className="pokemon">
        <div className='img'>
            <img src={img} alt="imagen pokemon"/>
        </div>
        <div>
            <Link to={`home/${id}`}><h3 className='name'>{name}</h3></Link>
            <h2 className='types'>
            {
                types.map(t => t + " ") 
            }
            </h2>
        </div>
    </div>
  )
}

export default Pokemon