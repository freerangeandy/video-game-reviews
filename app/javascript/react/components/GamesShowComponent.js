import React from 'react'

const GamesShowComponent = ({game}) => {
  const { title, image, description, creator, platform, genre,
        number_of_players, site, release_date } = game

  return (
    <div className="showtext">
      <h3>Title: {title}</h3>
      <img src={image}></img>
      <ul>
        <li>Description: {description}</li>
        <li>Creator: {creator}</li>
        <li>Platform: {platform}</li>
        <li>Genre: {genre}</li>
        <li>Player Setup: {number_of_players}</li>
        <li>Release Date: {release_date}</li>
        <li>Site: <a href={site}>{site}</a></li>
      </ul>
    </div>
  )
}

export default GamesShowComponent
