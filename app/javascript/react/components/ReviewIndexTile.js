import React from "react"

const ReviewIndexTile = (props) => {
  let reviewID = props.id

  const onClickHandler = (event) => {
    event.preventDefault()
    props.fetchDeleteReview(reviewID)
  }

  // goal: click on edit button next to review -> review rating/comment change to fields (populated with existing data)
  // [ ] refactor ReviewNewForm:
  //   [ ] rename to ReviewForm, updating references throughout app
  //   [ ] change fetchPostNewReview prop to fetchMethod
  // [ ] add state variable to GamesShowContainer: currentEditReview (default null)
  //    [ ] clicking 'edit' on review updates currentEditReview to that index (ex. of index 4 -> currentEditReview set to 4)
  //    [ ] clicking on another review's edit button switches currentEditReview to that index
  // [ ] pass boolean prop to each ReviewIndexTile, depending on if its index matches currentEditReview
  // [ ] refactor ReviewIndexTile
  //   [ ] if being edited: show ReviewForm, if not: show review data
  //   [ ] clickhandler for edit button

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
