import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getPokemonDetail } from '../../redux/actions';

const PokeDetalle = (props) => {
  const dispatch = useDispatch()
  const pokeDetail = useSelector(state => state.pokeDetail)
  const id = props.match.params.id

  useEffect(() => {
    dispatch(getPokemonDetail(id))
  },[dispatch,id])

  let {img, name, type,hp,attack,defense,speed,height,weight} = pokeDetail

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

export default PokeDetalle



