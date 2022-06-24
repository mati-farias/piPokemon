import React from 'react'
import PokeList from '../PokeList/PokeList';
import './Home.css'
import Navbar from '../Navbar/Navbar';
import { Link } from 'react-router-dom'
import { useState, useEffect} from 'react'
import { useSelector } from 'react-redux';
import Paginado from '../Paginado/Paginado';



const Home = () => {

  const allPokemons = useSelector(state => state.allPokemons)


  const [currentPage, setCurrentPage] = useState(1)
  const [pokemonsPerPage, setPokemonsPerPage] = useState(12)

  const indexOfLastPokemon = currentPage * pokemonsPerPage
  const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage
  let currentPokemons = [allPokemons.slice(indexOfFirstPokemon, indexOfLastPokemon)]

  
  useEffect(() => {

  }, [allPokemons])
  

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber)
  }
  return (
    <div>
      <div className='navbar'>
        <Navbar />
      </div>
      <div className='create'>
        <Link to="/create"><h3>Crea tu propio pokemon!</h3></Link>
      </div>
      <div>
        <div>
          <Paginado
            pokemonsPerPage={pokemonsPerPage}
            allPokemons={allPokemons.length}
            paginado={paginado}
          />

        <h3>Lista de Pokemon!!</h3>
        <PokeList currentPokemons={currentPokemons} />
        </div>
        <div>

        </div>
      </div>
    </div>
  )
}

export default Home