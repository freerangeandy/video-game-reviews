import React, { useState, useEffect } from "react"

import GamesIndexPane from "../components/GamesIndexPane"
import NewGameFormComponent from "../components/NewGameFormComponent"

const GamesIndexContainer = props => {
  const [games, setGames] = useState([])

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

  return (
    <div className="grid-container game-index-margin gic">
      <GamesIndexPane gamesList={games} />
      <NewGameFormComponent fetchPostNewGame={fetchPostNewGame} />
    </div>
  )
}

export default GamesIndexContainer
