import React, {useState } from 'react'
import { useDispatch} from 'react-redux'
import { getPokemonByName } from '../../redux/actions'
import './SearchBar.css'


const SearchBar = () => {
  const dispatch = useDispatch()
  const [name, setName] = useState('')
  
  
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
      <div className='textSearchBar'>
          <h3>Busqueda:</h3>
      </div>
          <input type="text" placeholder='Busca tu pokemon!' name="name" value={name} onChange={(e) => handleOnChange(e)}/>
                <button className="searchbtn" onClick={(e) => handleClick(e)}>
                      Search
                </button>
        </div>
  )
}

export default SearchBar