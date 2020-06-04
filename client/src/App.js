import React from 'react';

import {BrowserRouter as Router, Route} from 'react-router-dom'

import Lobby from './Pages/Lobby'
import Gameroom from './Pages/Gameroom'


const App =  () => {
  return(
    <Router>
      <Route path="/" exact component = {Lobby}/>
      <Route path="/gameroom" component = {Gameroom}/>
    </Router>
  )
}

export default App;