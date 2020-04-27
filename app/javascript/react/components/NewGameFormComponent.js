import React, { useState, Fragment } from 'react'
import _ from 'lodash'
import ErrorList from "../components/ErrorList"

const NewGameFormComponent = props => {
  const [errors, setErrors] = useState({})
  const [newGameFormData, setNewGameFormData] = useState({
    title: "",
    description: "",
    creater: "",
    platform: "",
    genre: "",
    site: "",
    release_date: ""
  })

  const clearFormData = () => {
    setNewGameFormData({
      title: "",
      description: "",
      creater: "",
      platform: "",
      genre: "",
      site: "",
      release_date: ""
    })
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
      <h4>Add a new game to our review library!</h4>
      <form className="callout" onSubmit={onSubmitHandler}>
        <ErrorList errors={errors}/>

        <label htmlFor="title">Title</label>
        <input type="text" name="title" id="title" onChange={handleChange} value={newGameFormData.title} />
  
        <label htmlFor="description">Description</label>
        <input type="text" name="description" id="description" onChange={handleChange} value={newGameFormData.description} />
  
        <label htmlFor="creater">Creator</label>
        <input type="text" name="creater" id="creater" onChange={handleChange} value={newGameFormData.creater} />

        <label htmlFor="platform">Platform</label>
        <input type="text" name="platform" id="platform" onChange={handleChange} value={newGameFormData.platform} />

        <label htmlFor="genre">Genre</label>
        <input type="text" name="genre" id="genre" onChange={handleChange} value={newGameFormData.genre} />

        <label htmlFor="site">Website</label>
        <input type="text" name="site" id="site" onChange={handleChange} value={newGameFormData.site} />

        <label htmlFor="release_date">Release Date</label>
        <input type="text" name="release_date" id="release_date" onChange={handleChange} value={newGameFormData.release_date} />

        <input type="submit" value="Add new game" />
      </form>
    </>
  )
}

export default NewGameFormComponent