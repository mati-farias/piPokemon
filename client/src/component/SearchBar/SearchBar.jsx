import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPokemonByName } from '../../redux/actions'
import { NavLink, useHistory} from 'react-router-dom'

const SearchBar = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const [name, setName] = useState('')
  
  let pokemon = useSelector(state => state.pokeByName)
  console.log(name)
  

  const handleOnChange = (e) => {
    e.preventDefault()
    setName(e.target.value);
    console.log(name)
  }
  
  const handleClick = (e) => {
    dispatch(getPokemonByName(name))
    console.log("click")
    e.preventDefault()
  }
  

  return (
    <div className="searchBar">
          <h5>Busqueda por nombre!</h5>
          <input type="text" placeholder='Busca tu pokemon!' name="name" value={name} onChange={(e) => handleOnChange(e)}/>
              <NavLink to={`home/search/${name}`}>
                <button onClick={(e) => handleClick(e)}>
                      Search
                </button>
              </NavLink>
        </div>
  )
}

export default SearchBar