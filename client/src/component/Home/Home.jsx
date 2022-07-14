import React from 'react'
import PokeList from '../PokeList/PokeList';
import './Home.css'
import Navbar from '../Navbar/Navbar';
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Paginado from '../Paginado/Paginado';
import { filterByTypes, sortBy, filterByOrigin, getAllTypes, getAllPokemon } from '../../redux/actions/index.js'
import { Spinner } from '../Spinner.jsx/Spinner';



const Home = () => {
  //traigo el estado actual de pokemons
  const dispatch = useDispatch()

  const loading = useSelector(state => state.loading)
  const { allPokemons } = useSelector(state => state)

  useEffect(() => {
    if (!allPokemons.length) dispatch(getAllPokemon())
    dispatch(getAllTypes())
  }, [dispatch])

  // PAGINADO 
  const [currentPage, setCurrentPage] = useState(1)
  const [pokemonsPerPage] = useState(12)
  const indexOfLastPokemon = currentPage * pokemonsPerPage
  const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage
  let currentPokemons = allPokemons.slice(indexOfFirstPokemon, indexOfLastPokemon)

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  //--------------------------------------------------------------------------------

  // filter


  let types = useSelector(state => state.types)

  //

  function handleFilterTypes(e) {
    dispatch(filterByTypes(e.target.value))
    paginado(1)
  }

  function handleFilterOrigin(e) {
    dispatch(filterByOrigin(e.target.value))
    paginado(1)
  }

  // sort
  function handleSort(e) {
    dispatch(sortBy(e.target.value))
    paginado(1)
  }


  return (
    <div className='home'>
      <div className='navbar'>
        <Navbar paginado={paginado} />
      </div>

      <div className='upperContainer'>

        <div className="sort">
          {/* onChange={(e) => handleSortPokemons(e)} */}
          <h3 className='text'>Sort the list!</h3>
          <select id="OrdenBy" onChange={handleSort}>
            <option value="NONE" selected disabled hidden>None</option>
            <option value="AZ">By name from A to Z</option>
            <option value="ZA">By name from Z to A</option>
            <option value="asc">By attack from min to max</option>
            <option value="desc">By attack from max to min</option>
          </select>
        </div>

        <div className='create'>
          {/* <Link to="/create" className='linkTitle'><h3 className='text'>Create your own pokemon!</h3></Link> */}
          <h3 className='text'>Create your own pokemon!</h3>
          <Link to="/create" className='linkSubtitle'><h3 className='textClick'>Click me!</h3></Link>
        </div>

        <div className='filters'>
          <div className='filterType'>
            <h3 className='text'>Filter by type:</h3>
            <select onChange={e => { handleFilterTypes(e) }}>
              <option value="NONE" selected disabled hidden >None</option>
              <option value="All">All</option>
              {types?.map((el) => {
                return <option key={el.id} value={el.name}>{el.name}</option>;
              })}
            </select>
          </div>

          <div className='filterOrigin'>
            <h3 className='text'>Filter by origin:</h3>
            <select onChange={e => { handleFilterOrigin(e) }}>
              <option value="NONE" selected disabled hidden >None</option>
              <option value="all">All</option>
              <option value="created">Created</option>
              <option value="pokeApi">PokeApi</option>
            </select>
          </div>

        </div>

      </div>



      <div>
        <h3 className="list-title">Pokemon's List</h3>
        <div className='paginado'>
          <Paginado
            pokemonsPerPage={pokemonsPerPage}
            allPokemons={allPokemons.length}
            paginado={paginado}
            currentPage={currentPage}
          />
        </div>
        <div className='container'>
          <div className='pokemonList'>
            {loading ? <Spinner /> : currentPokemons.length > 0 ? <PokeList currentPokemons={currentPokemons} /> : <h2>No pokemons found!</h2>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home