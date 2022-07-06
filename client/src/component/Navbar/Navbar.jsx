import React from 'react'
import { NavLink } from 'react-router-dom'
import img from '../../images/pokeballpng.png'
import SearchBar from '../SearchBar/SearchBar'
import { useDispatch } from 'react-redux'
import { getAllPokemon } from '../../redux/actions/index.js'

import './Navbar.css'



const Navbar = () => {

  const dispatch = useDispatch()

  const refreshPage = (e) => {
    dispatch(getAllPokemon())
  }



  return (
    <nav className='navbar'>
      <div className='navContainer'>
        <div className='divLogo'>
          <NavLink to="/home">
            <img className="logo" src={img} alt="logo" onClick={refreshPage} />
          </NavLink>
        </div>
        <div className='textPokedex'>
          <h1>HenryPokedex</h1>
        </div>
        <div className='searchBar'>
          <SearchBar />
        </div>
      </div>
    </nav>
  )
}

export default Navbar