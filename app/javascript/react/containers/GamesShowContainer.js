import React, { useState, useEffect } from "react"
import GamesShowComponent from "./../components/GamesShowComponent"
import ReviewIndexTile from "./../components/ReviewIndexTile"

const GamesShowContainer = props => {
  const [game, setGame] = useState({
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
  const [reviews, setReviews] = useState([])

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

  useEffect(() => {
    fetch(`/api/v1/games/${gameID}/reviews.json`)
    .then((response) => {
      if (response.ok) {
        return response
      } else {
        let errorMessage = `${response.status}: ${response.statusText}`
        let error = new Error(errorMessage)
        throw(error)
      }
    })
    .then((response) => {
      return response.json()
    })
    .then((reviews) => {
      setReviews(reviews)
    })
    .catch((error) => {
      console.error(`Error in fetching reviews: ${error.message}`)
    })
  }, [])

  const newReviews = reviews.map((review) => {
    return(
      <ReviewIndexTile
      rating={review.rating}
      comment={review.comment}
      />
    )
  })

  return(
    <div className="grid-container">
      <GamesShowComponent game = {game} />
      {newReviews}
    </div>
  )
}

export default GamesShowContainer
