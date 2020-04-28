import React, { useState, useEffect } from "react"
import GamesShowComponent from "./../components/GamesShowComponent"
import ReviewIndexTile from "./../components/ReviewIndexTile"
import ReviewNewForm from "./../components/ReviewNewForm"

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
    reviews: []
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
    .then(game => {
      setGame(game)
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`))
  }, [])

  const fetchPostNewReview = (reviewPayload) => {
    fetch("/api/v1/reviews", {
      credentials: "same-origin",
      method: "POST",
      body: JSON.stringify(reviewPayload),
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
    .then(newReview => {
      const existingReviews = game.reviews
      setGame({
        ...game,
        reviews: [
          ...existingReviews,
          newReview
        ]
      })
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`))
  }

  let newReviews = null
  if (game.reviews.length > 0) {
    newReviews = game.reviews.map((review) => {
      return(
        <ReviewIndexTile
        key={review.id}
        rating={review.rating}
        comment={review.comment}
        />
      )
    })
  }

  return(
    <div className="grid-container">
      <GamesShowComponent game = {game} />
      <ReviewNewForm 
        gameID={gameID} 
        fetchPostNewReview={fetchPostNewReview}
      />
      {newReviews}
    </div>
  )
}

export default GamesShowContainer
