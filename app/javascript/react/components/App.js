import React from 'react'
import { BrowserRouter, Switch, Route } from "react-router-dom"

import GamesIndexContainer from "../containers/GamesIndexContainer"

const App = (props) => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/games" component={GamesIndexContainer}/>
        <Route path="/" component={GamesIndexContainer}/>
      </Switch>
    </BrowserRouter>
  )
}

export default App
