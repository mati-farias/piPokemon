import React,{useEffect} from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { getAllPokemon, getAllTypes} from '../../redux/actions/index.js'
import './Landing.css'

// DESCARGAR 4k VIDEO DOWNLOADER

function Landing() {

  const dispatch = useDispatch()
  // useEffect(() => {
  //   dispatch(getAllPokemon())
  //   dispatch(getAllTypes())
  // },[dispatch])
  
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