import React from 'react'
import { Link } from 'react-router-dom'
import img from '../../images/pokebola.png'
import {useDispatch, useSelector} from 'react-redux'
import { getAllPokemon, getAllTypes, filterByTypes} from '../../redux/actions/index.js'

const Navbar = () => {
    const dispatch = useDispatch()
    
    let types = useSelector(state => state.types)
    console.log(types)

    function handleFilterTypes(e) {
      dispatch(filterByTypes(e.target.value))
    }

    function handleClick(e){
      e.preventDefault();
  }
  
  return (
    <div>
        <Link to="/home">
        <img src={img} alt="logo"/>
        </Link>
        <div>
        <label>Busqueda por nombre!</label>
      <input type="text" placeholder='Busca tu pokemon!' />
        </div>
        <div>
        {/* onChange={(e) => handleSortPokemons(e)} */}
          <h3>Ordenemos la lista!</h3>
          <select id="OrdenBy">
            <option value="NONE" >None</option>
            <option value="ABC">By name from A to Z</option>
            <option value="ZYX">By name from Z to A</option>
            <option value="asc">By attack from min to max</option>
            <option value="desc">By attack from max to min</option>
          </select>
          <button className='order' onClick={e => handleClick(e)}>Ordenar!</button>
        <div>
        {/* onChange={(e) => handleFilterType(e) }*/}
            <h3>Filtremos la lista!</h3>
            <select onClick={e => {handleFilterTypes(e)}}>    
            <option value="All">All</option>
            {types?.map((el) => {
              return <option key={el.id} value={el.name}>{el.name}</option>;
            })}
          </select>
        </div>
        </div>
    </div>
  )
}

export default Navbar