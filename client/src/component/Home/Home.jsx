import React from 'react'
import PokeList from '../PokeList/PokeList';
import './Home.css'
import Navbar from '../Navbar/Navbar';
import { Link } from 'react-router-dom'
import { useState  } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Paginado from '../Paginado/Paginado';
import { filterByTypes, sortBy, filterByOrigin } from '../../redux/actions/index.js'



const Home = () => {
  //traigo el estado actual de pokemons
  const {allPokemons} = useSelector(state => state)
  // PAGINADO 
  const [currentPage, setCurrentPage] = useState(1)
  const [pokemonsPerPage, setPokemonsPerPage] = useState(12)

  const indexOfLastPokemon = currentPage * pokemonsPerPage
  const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage
  let currentPokemons = allPokemons.slice(indexOfFirstPokemon, indexOfLastPokemon)

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  //--------------------------------------------------------------------------------

  // filter

  const dispatch = useDispatch()

  let types = useSelector(state => state.types)
  console.log(types)

  function handleFilterTypes(e) {
    dispatch(filterByTypes(e.target.value))
  }

  function handleFilterOrigin(e){
    dispatch(filterByOrigin(e.target.value))
  }

  // sort
  function handleSort(e) {
    dispatch(sortBy(e.target.value))
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
                {/* onChange={(e) => handleSortPokemons(e)} */}
                <h3>Ordenemos la lista!</h3>
                <select id="OrdenBy" onChange={handleSort}>
                    <option value="NONE" >None</option>
                    <option value="AZ">By name from A to Z</option>
                    <option value="ZA">By name from Z to A</option>
                    <option value="asc">By attack from min to max</option>
                    <option value="desc">By attack from max to min</option>
                </select>
            </div>
            <div>
          {/* onChange={(e) => handleFilterType(e) }*/}
          <h3>Filtremos la lista!</h3>
          <select onChange={e => { handleFilterTypes(e) }}>
            <option value="All">All</option>
            {types?.map((el) => {
              return <option key={el.id} value={el.name}>{el.name}</option>;
            })}
          </select>
          <select onChange={e => { handleFilterOrigin(e)}}>
            <option value="all">All</option>
            <option value="created">Created</option>
            <option value="pokeApi">PokeApi</option>
          </select>
      </div>
        </div>
        <div>
              <h3>Lista de Pokemon!!</h3>
            <div>
                <Paginado
                  pokemonsPerPage={pokemonsPerPage}
                  allPokemons={allPokemons.length}
                  paginado={paginado}
                />
            </div>
                <div className='container'>
                    <div className='pokemonList'>
                        <PokeList currentPokemons={currentPokemons} />
                    </div>
                </div>
        </div>
    </div>
  )
}

export default Home