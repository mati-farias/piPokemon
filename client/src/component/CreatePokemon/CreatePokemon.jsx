import React from 'react'
import { useState } from 'react-redux'
import { getAllTypes } from '../../redux/actions/index.js'
import { useSelector} from 'react-redux'

const CreatePokemon = () => {

    // const [data, setData] = useState("")

    let types = useSelector(state => state.types)
    console.log(types)

    const handleInputChange = (e) => {
        
    }


    const enviarDatos = (e) => {
        e.preventDefault()
    }
  return (
    <div>
        <h1>Create your own Pokemon!</h1>
        <form className='form' onSubmit={(enviarDatos)}>
          <div>
            <h4>Name: </h4> 
            <input type="text" placeholder='Name!' className='form-control' onChange={handleInputChange} name="name"/>
          </div>
          <div>
            <h4>Choose your pokemon's types!</h4>
            <h6>(it can be more than one!)</h6>
            { 
            types.map((e) => {
              return (
                <div key={e.id}>
                  <input type="checkbox" id={e.id}/>
                  <label>{e.name}</label>
                </div>
              )
              
            })
            }
          </div>
          <div>
            <input type="text" placeholder='HP!' className='form-control' onChange={handleInputChange} name="hp"/>
          </div>
          <div>
            <input type="text" placeholder='attack!' className='form-control' onChange={handleInputChange} name="attack"/>
          </div>
          <div>
            <input type="text" placeholder='defense!' className='form-control' onChange={handleInputChange} name="defense"/>
          </div>
          <div>
            <input type="text" placeholder='speed!' className='form-control' onChange={handleInputChange} name="speed"/>
          </div>
          <div>
            <input type="text" placeholder='height!' className='form-control' onChange={handleInputChange} name="height"/>
          </div>
          <div>
            <input type="text" placeholder='weight!' className='form-control' onChange={handleInputChange} name="height"/>
          </div>
        </form>
    </div>
  )
}   

export default CreatePokemon