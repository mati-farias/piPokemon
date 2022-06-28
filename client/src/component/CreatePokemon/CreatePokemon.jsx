import React,{useState} from 'react'
import { createPokemon } from '../../redux/actions/index.js'
import { useDispatch, useSelector } from 'react-redux'

const CreatePokemon = () => {

  const dispatch = useDispatch()

  let types = useSelector(state => state.types)


  //crear estados locales para cada input
  const [input, setInput] = useState({
    name: "",
    types: [],
    hp: "",
    attack: "",
    defense: "",
    speed: "",
    height: "",
    weight: "",
  })

  const handleInputChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    })
  }

  const handleCheckbox = (e) => {
    if(e.target.checked && !input.types.includes(e.target.value)){
      console.log(input.types)
      console.log(e.target.value)
      setInput({
        ...input,
        types: [...input.types, e.target.value]
      }) 
    }
    else {
      let filtered = input.types.filter(el => el !== e.target.value)
      setInput({
          ...input,
          types: filtered
        
      })
    }
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(createPokemon(input))
  }
  return (
    <div>
      <h1>Create your own Pokemon!</h1>
      <form className='form' onSubmit={handleSubmit}>
        <div>
          <h4>Name: </h4>
          <input type="text" placeholder='Name!' className='form-control' onChange={handleInputChange} name="name" value={input.name} />
        </div>
        <div>
          <h4>Choose your pokemon's types!</h4>
          <h6>(it can be more than one!)</h6>
          {
            types.map((e) => {
              return (
                <div key={e.id}>
                  <input type="checkbox" id={e.id} onChange={handleCheckbox} value={e.name} />
                  <label>{e.name}</label>
                </div>
              )

            })
          }
          <div>
            {input.types.map(e => e +", ")}
          </div>
        </div>
        <div>
          <input 
            type="number" 
            placeholder='HP!' 
            className='form-control' 
            onChange={e =>handleInputChange(e)} 
            name="hp" 
            value={input.hp}/>
        </div>
        <div>
          <input type="number" placeholder='attack!' className='form-control' onChange={handleInputChange} name="attack" value={input.attack}/>
        </div>
        <div>
          <input type="number" placeholder='defense!' className='form-control' onChange={handleInputChange} name="defense" value={input.defense}/>
        </div>
        <div>
          <input type="number" placeholder='speed!' className='form-control' onChange={handleInputChange} name="speed" value={input.speed}/>
        </div>
        <div>
          <input type="number" placeholder='height!' className='form-control' onChange={handleInputChange} name="height" value={input.height} />
        </div>
        <div>
          <input type="number" placeholder='weight!' className='form-control' onChange={handleInputChange} name="weight" value={input.weight}/>
        </div>
        <div>
          <input type="submit" />
        </div>
      </form>
    </div>
  )
}

export default CreatePokemon