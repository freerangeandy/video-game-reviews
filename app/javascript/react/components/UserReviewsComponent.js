import React, { Fragment } from "react"
import ReviewIndexTile from "./ReviewIndexTile"

const UserReviewsComponent = props => {

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

  let allReviews = null
  if (props.reviews.length > 0) {
    allReviews = props.reviews.map((review) => {
      return(
        <ReviewIndexTile
          key={review.id}
          id={review.id}
          rating={review.rating}
          comment={review.comment}
          fetchDeleteReview={fetchDeleteReview}
        />
      )
    })
  }

  return (
    <>
      <div className="user-reviews">
        <h3>You have written {props.reviews.length} reviews!</h3>
        {allReviews}
      </div>
    </>
  )
}

export default UserReviewsComponent
