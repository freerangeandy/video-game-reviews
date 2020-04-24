import React, { Fragment }  from 'react'

const GamesShowComponent = props => {
  const title = props.game.title
  const image = props.game.image
  const description = props.game.description
  const creator = props.game.creator
  const platform = props.game.platform
  const genre = props.game.genre
  const site = props.game.site
  const release_date = props.game.release_date
  const created_at = props.game.created_at

  return (
    <>
      <h2> Hello from GamesShowComponent </h2>

      <div><h3>{title}</h3></div>
      <div><img src={image}></img></div>
      <div><h3>{description}</h3></div>
      <div><h3>{creator}</h3></div>
      <div><h3>{platform}</h3></div>
      <div><h3>{genre}</h3></div>
      <div><h3>{site}</h3></div>
      <div><h3>{release_date}</h3></div>
      <div><h3>{created_at}</h3></div>
    </>
  )
}

export default GamesShowComponent
