import React, { useState, useEffect, Fragment } from "react"
import { checkPropTypes } from "prop-types"
import GamesShowComponent from "./../components/GamesShowComponent"

const GamesShowContainer = props => {
  const [ game, setGame ] = useState({
    title: "",
    image: "",
    number_of_players: "",
    description: "",
    creator: "",
    platform: "",
    genre: "",
    site: "",
    release_date: "",
    created_at: "",
    updated_at: ""
  })

  let gameID = props.match.params.id

  useEffect(() => {
    fetch(`/api/v1/games/${gameID}`)
    .then(response => {
      if (response.ok) {
        return response
      } else {
        let errorMessage = `${response.status} (${response.statusText})`
        let error = new Error(errorMessage)
        throw(error)
      }
    })
    .then(response => response.json())
    .then(parsedJSON => setGame(parsedJSON))
    .catch(error => console.error(`Error in fetch: ${error.message}`))
  }, [])


  return(
    <>
      <GamesShowComponent game = {game} />
    </>
  )
}

export default GamesShowContainer
