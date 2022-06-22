import React from 'react';
import './App.css';
import Home from './component/Home/Home';
import Landing from './component/Landing/Landing'
import { Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
        <React.Fragment>
          <Route exact path="/" component={Landing}/>
          <Route exact path="/home" component={Home}/>
        </React.Fragment>
    </div>
  );
}

export default App;
