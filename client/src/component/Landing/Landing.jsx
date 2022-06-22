import React,{useEffect} from 'react'
import { Link } from 'react-router-dom'
import img from '../../images/wallpaper.jpg'
import { useDispatch } from 'react-redux';
import { getAllPokemon } from '../../redux/actions/index.js'

// DESCARGAR 4k VIDEO DOWNLOADER

function Landing() {

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getAllPokemon())
  },[])
  return (
    <div>
        <h1>Bienvenido a tu Pokedex!</h1>
        
        <Link to='/home'>
            IR A POKEMON!
        </Link>
        <img src={img} alt="pokeWallPaper"/>
    </div>
  )
}

export default Landing