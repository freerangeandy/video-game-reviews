import React from 'react'

const GamesShowComponent = ({game}) => {
  const { title, image, description, creator, platform, genre,
        number_of_players, site, release_date, created_at } = game

  return (
    <div>
      <h3>Title: {title}</h3>
      <img src={image}></img>
      <p>Description: {description}</p>
      <ul>
        <li>Creator: {creator}</li>
        <li>Platform: {platform}</li>
        <li>Genre: {genre}</li>
        <li>Player Setup: {number_of_players}</li>
        <li>Site: {site}</li>
        <li>Release Date: {release_date}</li>
      </ul>
    </div>
  )
}

export default GamesShowComponent
