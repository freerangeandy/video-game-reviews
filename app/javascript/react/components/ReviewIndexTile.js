import React from "react"

const ReviewIndexTile = (props) => {
  let reviewID = props.id

  const onClickHandler = (event) => {
    event.preventDefault()
    props.fetchDeleteReview(reviewID)
  }
  let deleteButton
  if (props.allowDeletion) {
    deleteButton = (<input
      className="button"
      type="button"
      value="delete"
      onClick={onClickHandler}
    />)
  }
  return (
<<<<<<< HEAD
    <div className="review-tile" >
      <h4>{props.rating}/5☆</h4>
=======
    <div>
      <h4><span>{props.reviewUserName}: </span> {props.rating}/5</h4>
>>>>>>> 37679cd44b3981a587056539ae5c11956741d9ca
      <p>{props.comment}</p>
      {deleteButton}
    </div>
  )
}

export default ReviewIndexTile
