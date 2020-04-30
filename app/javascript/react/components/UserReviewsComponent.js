import React, { Fragment } from "react"

const UserReviewsComponent = props => {

  return (
    <>
      <div className="user-reviews">
        <h3>You have written {props.reviews.length} reviews!</h3>
        {props.reviews}
      </div>
    </>
  )
}

export default UserReviewsComponent
