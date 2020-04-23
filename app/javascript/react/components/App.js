import React from 'react'
import { BrowserRouter, Switch, Route } from "react-router-dom"

import GamesIndexContainer from "../containers/GamesIndexContainer"
import GamesShowContainer from "../containers/GamesShowContainer"

const App = (props) => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/games" component={GamesIndexContainer}/>
        <Route exact path="/games/:id" component={GamesShowContainer}/>
        <Route path="/" component={GamesIndexContainer}/>
      </Switch>
    </BrowserRouter>
  )
}

export default App
