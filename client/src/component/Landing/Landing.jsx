import React from 'react'
import { Link } from 'react-router-dom'
import './Landing.css'

// DESCARGAR 4k VIDEO DOWNLOADER

function Landing() {
  
  return (
    <div className="landing">
      <div className='landingWrapper'>
        <h1 className='title'>Welcome to your</h1>
        <h1 className='subtitle'>Pokedex!</h1>
        <Link to='/home' className='linkto'>
        <button className='glow-on-hover'>
           <h2 className="buttonText">Start!</h2>
        </button>
        </Link>
      </div>
    </div>
  )
}

export default Landing