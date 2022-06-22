import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAllPokemon } from '../../redux/actions/index.js'
import './Home.css'

const Home = () => {

  const dispatch = useDispatch()
  
  let allPokemon = useSelector(state => state.allPokemons)
  
  
  return (
    <div>
      <input type="text" placeholder='Busca tu pokemon!' />
      <div>
        <h3>Lista de Pokemon!!</h3>
        <ul>
        {
          allPokemon.map(e => (
            <li key={e.name}>
              <img src={e.img} />
              <li>{e.name}</li>
              <li>{ e.type.map(t => t + " ") }</li>
            </li>
          ))
        }
        </ul>
      </div>
    </div>
  )
}

export default Home