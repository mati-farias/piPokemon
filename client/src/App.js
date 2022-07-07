import React from 'react';
import './App.css';
import Home from './component/Home/Home';
import Landing from './component/Landing/Landing'
import { Route } from "react-router-dom";
import PokeDetalle from './component/PokeDetalle/PokeDetalle';
import CreatePokemon from './component/CreatePokemon/CreatePokemon';


function App() {
  return (
      <div className="App">
          <React.Fragment>
            <Route exact path="/" component={Landing}/>
            <Route exact path="/create" component={CreatePokemon}/>
            <Route exact path="/home" component={Home}/>
            <Route exact path="/home/:id" component={PokeDetalle}/>
          </React.Fragment>
      </div>
   
    );
}

export default App;
