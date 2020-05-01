import React from "react"

const ReviewIndexTile = (props) => {
  let reviewID = props.id

  const onClickHandler = (event) => {
    event.preventDefault()
    props.fetchDeleteReview(reviewID)
  }
  let deleteButton
  if (props.byCurrentUser) {
    deleteButton = (<input
      className="button"
      type="button"
      value="delete"
      onClick={onClickHandler}
    />)
  }
  return (
    <div>
      <h4>{props.rating}/5☆</h4>
      <p>{props.comment}</p>
      {deleteButton}
    </div>
  )
}

export default ReviewIndexTile
