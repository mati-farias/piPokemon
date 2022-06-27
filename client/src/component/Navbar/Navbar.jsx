import React from 'react'
import { Link } from 'react-router-dom'
import img from '../../images/pokebola.PNG'
import SearchBar from '../SearchBar/SearchBar'

import './Navbar.css'

const Navbar = () => {

  return (
    <nav className='navbar'>
      <div className='navContainer'>
        <div>
          <SearchBar />
        </div>
        <div>
          <Link to="/home">
            <img className="logo" src={img} alt="logo" />
          </Link>
        </div>
        <div className='textPokedex'>
          <h2>HenryPokedex</h2>
        </div>
        

      </div>    
    </nav>
  )
}

export default Navbar