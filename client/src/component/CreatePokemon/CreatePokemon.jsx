import React,{useState} from 'react'
import { createPokemon } from '../../redux/actions/index.js'
import { useDispatch, useSelector } from 'react-redux'
import { Link,useHistory } from 'react-router-dom'

const validate = ({name, hp, attack, defense, speed, height, weight, image}) => {
  const errors = {};
  // const regEx = /^\d+$/;
  const regExURL = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png|svg|webp)/g;

  if(!name) errors.name = 'Name is required';
  if(!hp) errors.hp = 'HP is required and must be a NUMBER smaller than 3000';
  if(!attack  ||  attack === 'e'    || attack > 1000) errors.attack = 'Attack is required and must be a NUMBER smaller than 1000';
  if(!defense || defense === 'e'    || defense > 1000 ) errors.defense = 'Defense is required and must be a NUMBER  smaller than 1000';
  if(!speed   ||   speed === 'e'    || speed > 500 ) errors.speed = 'Speed is required and must be a NUMBER  smaller than 500';
  if(!height  ||  height === 'e'    || height > 300) errors.height = 'Height is required and must be a NUMBER  smaller than 300';
  if(!weight  ||  weight === 'e'    || weight > 300) errors.weight = 'Weight is required and must be a NUMBER  smaller than 300';
  if(image.length > 0 && image.search(regExURL) === -1) errors.image = "Image must be a valid url or left empy";
  

  return errors

}

const CreatePokemon = () => {

  const dispatch = useDispatch()
  const history = useHistory();
  let pokemons = useSelector(state => state.allPokemons)

  let types = useSelector(state => state.types)


  // validating



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
    image: ""
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
    let errors = Object.keys(validate(input))
    if(errors.length !== 0){
      alert('You have a couple of errors.You need to fix it to create the pokemon!')
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
        image: ""
      })
      history.push('/home')
    }
  }
  return (
    <div>
      <div className='homebutton'>
        <Link to='/home'>Volver a la página principal</Link>
      </div>
      <h1>Create your own Pokemon!</h1>
      <form className='form' onSubmit={handleSubmit}>
        <div>
          <h4>Name: </h4>
          <input type="text" placeholder='Name!' onChange={(e) => handleInputChange(e)} name="name" value={input.name} 
          />
          {errors.name && <div><p>{errors.name}</p></div>}
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
          <input type="number" placeholder='HP!' className='form-control' onChange={e =>handleInputChange(e)} name="hp" value={input.hp}/>
          <div>
            {errors.hp && <p>{errors.hp}</p>}
          </div>
        </div>
        <div>
          <input type="number" placeholder='attack!' className='form-control' onChange={handleInputChange} name="attack" value={input.attack}/>
          <div>
            {errors.attack && <p>{errors.attack}</p>}
          </div>
        </div>
        <div>
          <input type="number" placeholder='defense!' className='form-control' onChange={handleInputChange} name="defense" value={input.defense}/>
          {errors.defense && <p>{errors.defense}</p>}
        </div>
        <div>
          <input type="number" placeholder='speed!' className='form-control' onChange={handleInputChange} name="speed" value={input.speed}/>
          {errors.speed && <p>{errors.speed}</p>}
        </div>
        <div>
          <input type="number" placeholder='height!' className='form-control' onChange={handleInputChange} name="height" value={input.height} />
          {errors.height && <p>{errors.height}</p>}
        </div>
        <div>
          <input type="number" placeholder='weight!' className='form-control' onChange={handleInputChange} name="weight" value={input.weight}/>
          {errors.weight && <p>{errors.weight}</p>}
        </div>
        <div>
          <input type="text" placeholder='It can be an url or just leave it empty!' className='form-control' onChange={handleInputChange} name="image" value={input.image}/>
          {errors.image && <p>{errors.image}</p>}
        </div>
        <div>
          <input type="submit" />
        </div>
      </form>
    </div>
  )
}

export default CreatePokemon


// if(!name) errors.name = 'Name is required';
    // if(!hp || hp.search(regEx) === -1) errors.hp = 'HP is required and must be a number';
    // if(!attack || attack.search(regEx) === -1) errors.attack = 'Attack is required and must be a number';
    // if(!defense || defense.search(regEx) === -1) errors.defense = 'Defense is required and must be a number';
    // if(!speed || speed.search(regEx) === -1) errors.speed = 'Speed is required and must be a number';
    // if(!height || height.search(regEx) === -1) errors.height = 'Height is required and must be a number';
    // if(!weight || weight.search(regEx) === -1) errors.weight = 'Weight is required and must be a number';
    // if(image.length > 0 && image.search(regExURL) === -1) errors.image = "Image must be a valid url or left empy";