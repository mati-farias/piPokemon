import React, { useState } from 'react'
import { createPokemon } from '../../redux/actions/index.js'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import './CreatePokemon.css'

const validate = ({ name, hp, attack, defense, speed, height, weight, img, types }) => {
  const errors = {};
  // const regExURL = /^((https?):\/\/)?([w|W]{3}\.)+[a-zA-Z0-9\-\.]{3,}\.[a-zA-Z]{2,}(\.[a-zA-Z]{2,})?$/;
  const regExURL = /([a-z\-_0-9\/\:\.]*\.(jpg|jpeg|png|gif))/i
  const whitespacesParameter = /(?!^\s+$)^.*$/m;
  const alphabeticalPattern = /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/;


  if (!name) errors.name = 'Name is required';
  if (!whitespacesParameter.test(name) || !alphabeticalPattern.test(name)) errors.name = 'It should be a valid name'
  if (!types || types.length === 0 || types.length > 2) errors.types = "Types is required and it can't be longer than 2";
  if (!hp || hp > 3000 || hp < 0) errors.hp = 'HP is required and must be a positive NUMBER smaller than 3000';
  if (!attack || attack === 'e' || attack > 1000 || attack < 0) errors.attack = 'Attack is required and must be a positive NUMBER smaller than 1000';
  if (!defense || defense === 'e' || defense > 1000 || defense < 0) errors.defense = 'Defense is required and must be a positive NUMBER  smaller than 1000';
  if (!speed || speed === 'e' || speed > 500 || speed < 0) errors.speed = 'Speed is required and must be a positive NUMBER smaller than 500';
  if (!height || height === 'e' || height > 300 || height < 0) errors.height = 'Height is required and must be a positive NUMBER smaller than 300';
  if (!weight || weight === 'e' || weight > 300 || weight < 0) errors.weight = 'Weight is required and must be a positive NUMBER smaller than 300';
  if (img.length > 0 && img.search(regExURL) === -1) errors.img = "Image must be a valid url or left empty";

  return errors

}

const CreatePokemon = () => {

  const dispatch = useDispatch()
  const history = useHistory();
  let pokemons = useSelector(state => state.allPokemons)

  let types = useSelector(state => state.types)



  const [input, setInput] = useState({
    name: "",
    types: [],
    hp: "",
    attack: "",
    defense: "",
    speed: "",
    height: "",
    weight: "",
    img: ""
  })
  const [errors, setErrors] = useState({})

  const handleInputChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    })
    setErrors(validate({
      ...input,
      [e.target.name]: e.target.value
    }))
  }

  const handleCheckbox = (e) => {
    if (e.target.checked && !input.types.includes(e.target.value)) {
      setInput({
        ...input,
        types: [...input.types, e.target.value]
      })

      setErrors(validate({
        ...input,
        types: [...input.types, e.target.value]

      }))
    }
    else {
      let filtered = input.types.filter(el => el !== e.target.value)
      setInput({
        ...input,
        types: filtered
      })
      setErrors(validate({
        ...input,
        types: filtered
      }))
    }
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    let errors = Object.keys(validate(input))
    for (let i in pokemons) {
      if (pokemons[i].name.toLowerCase() === input.name.toLowerCase()) {
        return alert("Pokemon already exists!")
      }
    }
    if (errors.length !== 0) {
      alert('Something went wrong. Check your answers!')
    }
    else {
      dispatch(createPokemon(input))
      pokemons.push(input)
      alert("Pokemon created succesfully")
      setInput({
        name: "",
        types: [],
        hp: "",
        attack: "",
        defense: "",
        speed: "",
        height: "",
        weight: "",
        img: ""
      })
      history.push('/home')
    }
  }

  return (
    <div className='backgroundForm'>
      <div className='homebutton'>
        <Link to='/home' className='linkHome'>Home page</Link>
      </div>

      <div className='formText'>
        <h1>Create your own Pokemon!</h1>
      </div>

      <form className='form' onSubmit={handleSubmit}>

        <div>
          <input type="text" placeholder='Name!' className="form-input" onChange={(e) => handleInputChange(e)} name="name" value={input.name}
          />
          <div className='errorBox'>
            {errors.name && <p>{errors.name}</p>}
          </div>
        </div>


        <h4 className="textCheckBox">Choose your pokemon's types!</h4>
        <div className='checkboxTypes'>
          {
            types.map((e) => {
              return (
                <div key={e.id} className="checkboxChild">
                  <input type="checkbox"  id={e.id} onChange={handleCheckbox} value={e.name} />
                  <label>{e.name}</label>
                </div>
              )

            })
          }
        </div>
        <div className='typeError'>
          <div className='errorBox'>
            {errors.types && <p>{errors.types}</p>}
          </div>
        </div>
        <div className='formText'>
          {input.types.map(e => e + ", ")}
        </div>



        <div>
          <input type="number" placeholder='HP!' className='form-input' onChange={e => handleInputChange(e)} name="hp" value={input.hp} />
          <div className='errorBox'>
            {errors.hp && <p>{errors.hp}</p>}
          </div>
        </div>
        <div>
          <input type="number" placeholder='attack!' className='form-input' onChange={handleInputChange} name="attack" value={input.attack} />
          <div className='errorBox'>
            {errors.attack && <p>{errors.attack}</p>}
          </div>
        </div>
        <div>
          <input type="number" placeholder='defense!' className='form-input' onChange={handleInputChange} name="defense" value={input.defense} />
          <div className='errorBox'>
            {errors.defense && <p>{errors.defense}</p>}
          </div>
        </div>
        <div>
          <input type="number" placeholder='speed!' className='form-input' onChange={handleInputChange} name="speed" value={input.speed} />
          <div className='errorBox'>
            {errors.speed && <p>{errors.speed}</p>}
          </div>
        </div>
        <div>
          <input type="number" placeholder='height!' className='form-input' onChange={handleInputChange} name="height" value={input.height} />
          <div className='errorBox'>
            {errors.height && <p>{errors.height}</p>}
          </div>
        </div>
        <div>
          <input type="number" placeholder='weight!' className='form-input' onChange={handleInputChange} name="weight" value={input.weight} />
          <div className='errorBox'>
            {errors.weight && <p>{errors.weight}</p>}
          </div>
        </div>
        <div>
          <input type="text" placeholder='It can be an url or just leave it empty!' className='form-input' onChange={handleInputChange} name="img" value={input.img} />
          <div className='errorBox'>
            {errors.image && <p>{errors.image}</p>}
          </div>
        </div>
        <div>
          <input type="submit" />
        </div>
      </form>
    </div>
  )
}

export default CreatePokemon