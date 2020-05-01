import React from 'react'

import GameIndexTile from './GameIndexTile'

const GamesIndexPane  = props => {
  const gameTiles = props.gamesList.map(game => {
    return (<GameIndexTile
      key={game.id}
      game={game}
    />)
  })

  return (
    <div className="grid-x grid-margin-x grid-margin-y" id="game-index-background">
      {gameTiles}
    </div>
  )
}

export default GamesIndexPane
