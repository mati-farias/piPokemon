import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getPokemonDetail, setPokemonDetails } from '../../redux/actions';
import imgDefault from '../../images/pokeball-png-45342.png';
import { Link } from 'react-router-dom'
import './PokeDetalle.css'
import { Spinner } from '../Spinner.jsx/Spinner';

const PokeDetalle =  (props) => {
  const dispatch = useDispatch()
  const {pokeDetail} = useSelector(state => state)
  const id = props.match.params.id
  
  
  useEffect(() => {
    dispatch(getPokemonDetail(id))
    return () => {
      dispatch(setPokemonDetails())
    }
  },[dispatch,id])
  
  // let {img, name, types, hp,attack,defense,speed,height,weight} = pokeDetail
  if (!pokeDetail.img){
    pokeDetail.img = imgDefault
  }
  
  return (
    <div className='detailBody'>
          <div className='homeDiv'>
          <Link to='/home' className='homebutton'>Home</Link>
        </div>
        {
          pokeDetail.name ?
          <div className='detailCard'>
            <h2 className='textDetail'>ID: {id}</h2>
            <div>
              <img className="detailImg"src={pokeDetail?.img} alt="imagen" />
            </div>
            <h2 className='textDetail'>Name:     {pokeDetail?.name}</h2>
            <h3 className='textDetail'>Type:     {pokeDetail?.types?.map(e => e + " ") }</h3>
            <h3 className='textDetail'>HP:       {pokeDetail?.hp}</h3>
            <h3 className='textDetail'>Attack:   {pokeDetail?.attack}</h3>
            <h3 className='textDetail'>Defense:  {pokeDetail?.defense}</h3>
            <h3 className='textDetail'>Speed:    {pokeDetail?.speed}</h3>
            <h3 className='textDetail'>Height:   {pokeDetail?.height}</h3>
            <h3 className='textDetail'>Weight:   {pokeDetail?.weight}</h3>
          </div>
          : <Spinner/>
        }
    </div>

)
}



export default PokeDetalle





