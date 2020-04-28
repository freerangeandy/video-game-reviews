import React from "react"

const ReviewIndexTile = (props) => {
  return (
    <div>
      <h4>{props.rating}/5</h4>
      <p>{props.comment}</p>
    </div>
  )
}

export default ReviewIndexTile
