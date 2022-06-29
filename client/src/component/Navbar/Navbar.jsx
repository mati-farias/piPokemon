import React from 'react'
import { NavLink } from 'react-router-dom'
import img from '../../images/pokeballpng.png'
import SearchBar from '../SearchBar/SearchBar'

import './Navbar.css'

const Navbar = () => {

  return (
    <nav className='navbar'>
      <div className='navContainer'>
        <div className='divLogo'>
          <NavLink to="/home">
            <img className="logo" src={img} alt="logo" />
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