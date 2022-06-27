import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getPokemonByName } from '../../redux/actions';

const PokeDetalleByName = (props) => {
    const dispatch = useDispatch()
    const pokeByName = useSelector(state => state.pokeByName)
    let {name} = props.match.params
     
  
    useEffect(() => {
      dispatch(getPokemonByName(name))
    },[dispatch,name])
  
    let {img, type,hp,attack,defense,speed,height,weight} = pokeByName
  
    return (
      <div>
        <div>
          <img src={img} alt="imagen" />
          <h2>Name: {name}</h2>
          <h3>Type: {type}</h3>
          <h3>HP: {hp}</h3>
          <h3>Attack: {attack}</h3>
          <h3>Defense: {defense}</h3>
          <h3>Speed: {speed}</h3>
          <h3>Height: {height}</h3>
          <h3>Weight: {weight}</h3>
        </div>
      </div>
  
    )
}

export default PokeDetalleByName