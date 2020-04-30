import React from "react"

const ReviewIndexTile = (props) => {
  let reviewID = props.id

  const onClickHandler = (event) => {
    event.preventDefault()
    props.fetchDeleteReview(reviewID)
  }

  return (
    <div>
      <h4>{props.rating}/5</h4>
      <p>{props.comment}</p>

      <input
        type="submit"
        value="delete"
        onClick={onClickHandler}
      />
    </div>
  )
}

export default ReviewIndexTile
