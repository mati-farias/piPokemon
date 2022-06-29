import React from 'react'
import './Paginado.css'

const Paginado = ({pokemonsPerPage,allPokemons,paginado}) => {

    const pageNumbers = [];

    for(let i = 1; i<=Math.ceil(allPokemons/pokemonsPerPage); i++){
        pageNumbers.push(i)
    }

  return (
    <nav className='pagination'>
        <ul className='ulPagination'>
            { pageNumbers &&
            pageNumbers.map(number =>(
                <li key={number}>
                    <a onClick={() => paginado(number)}>{number}</a>
                </li>
            ))}
        </ul>
    </nav>
  )
}

export default Paginado