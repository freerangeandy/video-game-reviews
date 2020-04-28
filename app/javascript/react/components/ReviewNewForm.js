import React, { useState } from "react"
import _ from 'lodash'
import ErrorList from "../components/ErrorList"

const ReviewNewForm = (props) => {
  const [errors, setErrors] = useState({})
  let [formPayload, setFormPayload] = useState({
    rating: "",
    comment: "",
    game_id: props.gameID
  })

  const update = (event) => {
    event.preventDefault()
    setFormPayload({
      ...formPayload,
      [event.currentTarget.id]: event.currentTarget.value
    })
  }

  const clearForm = () => {
    setFormPayload({
      rating: "",
      comment: "",
      game_id: props.gameID
    })
    setErrors({})
  }

  const formSubmit = (event) => {
    event.preventDefault()
    if (validForSubmission()){
      props.fetchPostNewReview(formPayload)
      clearForm()
    }
  }

  const validForSubmission = () => {
    let submitErrors = {}
    const requiredFields = ["rating", "comment"]
    requiredFields.forEach(field => {
      if (formPayload[field].trim() === "") {
        submitErrors = {
          ...submitErrors,
          [field]: "is blank"
        }
      }
    });
    setErrors(submitErrors)
    return _.isEmpty(submitErrors)
  }
    
  return (
    <form onSubmit={formSubmit}>
      <ErrorList errors={errors}/>

      <label htmlFor="rating">
        Rating
        <input
            id="rating"
            name="rating"
            type="text"
            onChange={update}
            value={formPayload.rating}
        />
      </label>

      <label htmlFor="comment">
        Comment
        <input
            id="comment"
            name="comment"
            type="text"
            onChange={update}
            value={formPayload.comment}
        />
      </label>

      <input type="submit" value="Submit" />
    </form>
  )
}

export default ReviewNewForm
