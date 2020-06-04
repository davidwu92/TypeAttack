import React from 'react';

import {BrowserRouter as Router, Route} from 'react-router-dom'

import Lobby from './components/Lobby'
import Gameroom from './components/Gameroom'


const App =  () => {
  return(
    <Router>
      <Route path="/" exact component = {Lobby}/>
      <Route path="/gameroom" component = {Gameroom}/>
    </Router>
  )
}

export default App;