import React, {useState } from 'react'
import { useDispatch} from 'react-redux'
import { getPokemonByName } from '../../redux/actions'
import './SearchBar.css'


const SearchBar = () => {
  const dispatch = useDispatch()
  const [name, setName] = useState('')
  
  const handleOnChange = (e) => {
    e.preventDefault()
    setName(e.target.value);
    
  }
  
  const handleClick = (e) => {
    dispatch(getPokemonByName(name))
  
    e.preventDefault()
  }
  

  return (
    <div className="searchBar">
      <div className='textSearchBar'>
          <h3>Search:</h3>
      </div>
          <input type="text" placeholder='Busca tu pokemon!' name="name" value={name} onChange={(e) => handleOnChange(e)}/>
                <button className="searchbtn" onClick={(e) => handleClick(e)}>
                      Search
                </button>
        </div>
  )
}

export default SearchBar