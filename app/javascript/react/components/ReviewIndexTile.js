import React from "react"

const ReviewIndexTile = (props) => {
  return (
    <div>
      <h4>Rating: {props.rating}</h4>
      <p>{props.comment}</p>
    </div>
  )
}

export default ReviewIndexTile
