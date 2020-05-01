import React, { useState, useEffect } from "react"
import GamesShowComponent from "./../components/GamesShowComponent"
import ReviewIndexTile from "./../components/ReviewIndexTile"
import ReviewNewForm from "./../components/ReviewNewForm"

const GamesShowContainer = props => {
  const [currentUser, setCurrentUser] = useState({
    id: null,
    role: "visitor"
  })
  const [reviews, setReviews] = useState([])
  const [game, setGame] = useState({
    title: "",
    image: "",
    number_of_players: "",
    description: "",
    creator: "",
    platform: "",
    genre: "",
    site: "",
    release_date: ""
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
    .then(body => {
      if (body.current_user !== null) {
        setCurrentUser(body.current_user)
      }
      setGame(body.game)
      setReviews(body.game.reviews)
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`))
  }, [])

  const fetchDeleteReview = (reviewID) => {
    fetch(`/api/v1/reviews/${reviewID}`, {
      credentials: "same-origin",
      method: "DELETE",
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
    .then(game => {
      setReviews(game.reviews)
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`))
  }

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
      setReviews([
        ...reviews,
        newReview
      ])
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`))
  }

  let allReviews = null
  if (reviews.length > 0) {
    allReviews = reviews.map((review) => {
      const reviewByCurrentUser = review.user_id === currentUser.id
      const adminLoggedIn = currentUser.role === "admin"
      const allowDeletion = reviewByCurrentUser || adminLoggedIn

      return(
        <ReviewIndexTile
          key={review.id}
          id={review.id}
          reviewUserName={review.user_name}
          rating={review.rating}
          comment={review.comment}
          fetchDeleteReview={fetchDeleteReview}
          allowDeletion={allowDeletion}
        />
      )
    })
  }

  let formOrNot = <ReviewNewForm gameID={gameID} fetchPostNewReview={fetchPostNewReview} />
  if (currentUser.id === null) {
    formOrNot = <div className="sign-in-message"><a href="/users/sign_in">Sign in here to add new review!</a></div>
  }

  return(
    <div className="grid-container showbg">
      <GamesShowComponent game={game} />
      {formOrNot}
      {allReviews}
    </div>
  )
}

export default GamesShowContainer
