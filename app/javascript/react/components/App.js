import React from 'react'
import { BrowserRouter, Switch, Route } from "react-router-dom"

import GamesIndexContainer from "../containers/GamesIndexContainer"
import GamesShowContainer from "../containers/GamesShowContainer"
import UserShowContainer from "../containers/UserShowContainer"

const App = (props) => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/games" component={GamesIndexContainer} />
        <Route exact path="/games/:id" component={GamesShowContainer} />
        <Route exact path="/users/:id" component={UserShowContainer} />
        <Route exact path="/" component={GamesIndexContainer} />
      </Switch>
    </BrowserRouter>
  )
}

export default App
