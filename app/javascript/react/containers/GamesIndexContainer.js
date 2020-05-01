import React, { useState, useEffect } from "react"
import { Link } from 'react-router-dom'

import GamesIndexPane from "../components/GamesIndexPane"
import NewGameFormComponent from "../components/NewGameFormComponent"

const GamesIndexContainer = props => {
  const [user, setUser] = useState({})
  const [games, setGames] = useState([])

  useEffect(() => {
    fetch("/api/v1/users/:id.json")
    .then((response) => {
      if (response.ok) {
        return response
      } else {
        let errorMessage = `${response.status} (${response.statusText})`
        let error = new Error(errorMessage)
        throw(error)
      }
    })
    .then(response => response.json() )
    .then(user => {
      setUser(user)
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`))
  }, [])

  useEffect(() => {
    fetch("/api/v1/games.json")
    .then((response) => {
      if (response.ok) {
        return response
      } else {
        let errorMessage = `${response.status} (${response.statusText})`
        let error = new Error(errorMessage)
        throw(error)
      }
    })
    .then(response => response.json() )
    .then(body => {
      setGames(body)
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`))
  }, [])

  const fetchPostNewGame = (gamePayload) => {
    fetch("/api/v1/games", {
      credentials: "same-origin",
      method: "POST",
      body: JSON.stringify(gamePayload),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
    .then(response => {
      if (response.ok) {
        return response
      } else {
        let errorMessage = `${response.status} (${response.statusText})`,
          error = new Error(errorMessage)
        throw error
      }
    })
    .then(response => response.json())
    .then(body => {
      let game = body
      setGames([
        ...games,
        game
      ])
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`))
  }

  let formOrNot = <NewGameFormComponent fetchPostNewGame={fetchPostNewGame} />
  if (user === null) {
    formOrNot = <div className="sign-in-message"><a href="/users/sign_in">Sign in here to add new games to review!</a></div>
  }

  return (
    <div>
      <div id="welcome-box" className="grid-container">
        <h4>WELCOME TO GAME REVIEW HERO</h4>
      </div>
      <div className="grid-container game-index-margin gic">
        <GamesIndexPane gamesList={games} />
        {formOrNot}
      </div>
    </div>
  )
}

export default GamesIndexContainer
