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
      <div >
        <h1 className='bienvenido'>Bienvenido a tu Pokedex!</h1>
        <button className='glow-on-hover'>
        <Link to='/home' className='linkto'>
           <h2>Pokedex</h2>
        </Link>
        </button>
      </div>
    </div>
  )
}

export default Landing