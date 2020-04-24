import React, { useState, useEffect } from "react"

import GamesIndexPane from "../components/GamesIndexPane"

const GamesIndexContainer = props => {
<<<<<<< HEAD
  return(
    <div> Hello from GamesIndexContainer </div>
=======
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

  return (
    <div className="grid-container game-index-margin">
      <GamesIndexPane gamesList={games} />
    </div>
>>>>>>> c06be150b91f1937a1924ae990dfc83a2d87f002
  )
}

export default GamesIndexContainer
