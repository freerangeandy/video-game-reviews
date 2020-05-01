import React, { useState, Fragment } from 'react'
import _ from 'lodash'
import ErrorList from "../components/ErrorList"

const NewGameFormComponent = props => {
  const defaultFormData = {
    title: "",
    image: "",
    description: "",
    creator: "",
    platform: "",
    genre: "",
    site: "",
    release_date: ""
  }

  const [errors, setErrors] = useState({})
  const [newGameFormData, setNewGameFormData] = useState(defaultFormData)

  const clearFormData = () => {
    setNewGameFormData(defaultFormData)
    setErrors({})
  }

  const onSubmitHandler = (event) => {
    event.preventDefault()
    if (validForSubmission()) {
      props.fetchPostNewGame(newGameFormData)
      clearFormData()
    }
  }

  const validForSubmission = () => {
    let submitErrors = {}
    const requiredFields = ["title"]
    requiredFields.forEach(field => {
      if (newGameFormData[field].trim() === "") {
        submitErrors = {
          ...submitErrors,
          [field]: "is blank"
        }
      }
    });
    setErrors(submitErrors)
    return _.isEmpty(submitErrors)
  }

  const handleChange = (event) => {
    event.preventDefault()
    setNewGameFormData({
      ...newGameFormData,
      [event.currentTarget.id]: event.currentTarget.value
    })
  }

  return (
    <>
      <div className="formtitle"><h4>Add a new game to our review library!</h4></div>
      <div className="formdiv grid-x grid-margin-x">
        <form className="callout cell small-12 medium-10 large-10" onSubmit={onSubmitHandler}>
          <ErrorList errors={errors} />

          <label htmlFor="title">Title</label>
          <input type="text" name="title" id="title" onChange={handleChange} value={newGameFormData.title} />

            <label htmlFor="image">Image (url)</label>
            <input type="text" name="image" id="image" onChange={handleChange} value={newGameFormData.image} />

          <label htmlFor="description">Description</label>
          <textarea className="vertical" name="description" id="description" onChange={handleChange} value={newGameFormData.description} />

          <div className="grid-x grid-margin-x">
            <div className="cell small-6">
              <label htmlFor="creator">Creator</label>
              <input type="text" name="creator" id="creator" onChange={handleChange} value={newGameFormData.creator} />
            </div>
            <div className="cell small-6">
              <label htmlFor="platform">Platform</label>
              <input type="text" name="platform" id="platform" onChange={handleChange} value={newGameFormData.platform} />
            </div>
          </div>
          <div className="grid-x grid-margin-x">
            <div className="cell small-6">
              <label htmlFor="genre">Genre</label>
              <input type="text" name="genre" id="genre" onChange={handleChange} value={newGameFormData.genre} />
            </div>
            <div className="cell small-6">
              <label htmlFor="release_date">Release Date</label>
              <input type="text" name="release_date" id="release_date" onChange={handleChange} value={newGameFormData.release_date} />
            </div>
          </div>

          <label htmlFor="site">Website URL</label>
          <input type="text" name="site" id="site" onChange={handleChange} value={newGameFormData.site} />

          <input className="button" type="submit" value="Add new game" />
        </form>
      </div>
    </>
  )
}

export default NewGameFormComponent
