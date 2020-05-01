import React, { useState, useEffect, Fragment } from 'react'
import UserProfileComponent from "./../components/UserProfileComponent"
import UserReviewsComponent from "./../components/UserReviewsComponent"

const UserShowContainer = (props) => {

  const defaultUserData = {
    email: "",
    user_name: "",
    profile_photo: {}
  }

  const [reviews, setReviews] = useState([])
  const [user, setUser] = useState(defaultUserData)

  let userID = props.match.params.id

  useEffect(() => {
    fetch(`/api/v1/users/${userID}`)
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
    .then(user => {
      setUser(user)
      setReviews(user.reviews)
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
      let newReviewList = reviews.filter((item) => {
        const keepReview = (item.id !== reviewID)
        return keepReview
      })
      setReviews(newReviewList)
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`))
  }

  return (
    <>
      <UserProfileComponent user={user} />
      <UserReviewsComponent reviews={reviews} fetchDeleteReview={fetchDeleteReview} />
    </>
  )
}

export default UserShowContainer
