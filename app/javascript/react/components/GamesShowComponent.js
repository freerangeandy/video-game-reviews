import React from 'react'

const GamesShowComponent = ({game}) => {
  const { title, image, description, creator, platform, genre,
        number_of_players, site, release_date, created_at } = game

  return (
      <div className="grid-x">
        <div className="small-6">
          <h3>{title}</h3>
          <p>{description}</p>
          <img src={image}></img>
        </div>
        <div className="small-6">
          <ul>
            <p>Creator: {creator}</p>
            <p>Platform: {platform}</p>
            <p>Genre: {genre}</p>
            <p>Player Setup: {number_of_players}</p>
            <p>Site: {site}</p>
            <p>Release Date: {release_date}</p>
          </ul>
        </div>
      </div>
  )
}

export default GamesShowComponent
