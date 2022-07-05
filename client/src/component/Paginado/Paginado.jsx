import React from 'react'
import './Paginado.css'

const Paginado = ({pokemonsPerPage,allPokemons,paginado,currentPage}) => {

    const pageNumbers = [];

    for(let i = 1; i<=Math.ceil(allPokemons/pokemonsPerPage); i++){
        pageNumbers.push(i)
    }

  return (
    <nav className='pagination'>
        <ul className='ulPagination'>
            { pageNumbers &&
            pageNumbers.map(number =>(
                currentPage === number ? 
                <li key={number} >
                    <button className="activePage" onClick={() => paginado(number)}>{number}</button>
                </li>
                :
                <li key={number} >
                    <button className='liPagination' onClick={() => paginado(number)}>{number}</button>
                </li>
            ))}
        </ul>
    </nav>
  )
}

export default Paginado