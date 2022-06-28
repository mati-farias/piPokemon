import React, { useEffect,useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getPokemonDetail } from '../../redux/actions';
import imgDefault from '../../images/poke_default.png'

const PokeDetalle =  (props) => {
  const dispatch = useDispatch()
  const {pokeDetail} = useSelector(state => state)
  const id = props.match.params.id
  console.log(pokeDetail)
  
  
  useEffect(() => {
    dispatch(getPokemonDetail(id))
  },[dispatch,id])
  
  // let {img, name, types, hp,attack,defense,speed,height,weight} = pokeDetail
  console.log("pokeDetail",pokeDetail)
  console.log("types",pokeDetail.types)
  if (!pokeDetail.img){
    pokeDetail.img = imgDefault
  }
  let hola = ""
  
  return (
    <div>
      <div>
        <img src={pokeDetail?.img} alt="imagen" />
        <h2>Name:     {pokeDetail?.name}</h2>
        <h3>Type:     {pokeDetail?.types ? pokeDetail.types.map(e => e + ", ") : hola }</h3>
        <h3>HP:       {pokeDetail?.hp}</h3>
        <h3>Attack:   {pokeDetail?.attack}</h3>
        <h3>Defense:  {pokeDetail?.defense}</h3>
        <h3>Speed:    {pokeDetail?.speed}</h3>
        <h3>Height:   {pokeDetail?.height}</h3>
        <h3>Weight:   {pokeDetail?.weight}</h3>
      </div>
    </div>

)
}

export default PokeDetalle



