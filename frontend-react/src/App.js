import React, { Component } from 'react';
//import './App.css';
import Login from './login/Login';
import Stream from './stream/Stream'
import { Switch, Route } from 'react-router-dom';

class App extends Component {
  render(){
    return(
      <Switch>
        <Route exact path='/' component={Login}/>
        <Route exact path='/user' component={Stream}/>
      </Switch>
    );
  }
}
export default App;
