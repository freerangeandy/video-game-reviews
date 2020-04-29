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
    <div className="grid-container showbg">
      <GamesShowComponent game = {game} />
      {newReviews}
    </div>
  )
}

export default GamesShowContainer
