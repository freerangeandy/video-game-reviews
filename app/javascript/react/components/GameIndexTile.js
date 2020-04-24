import React from "react"

  const GameIndexTile = props => {
    return (
      <div className="cell small-4 game-tile">
        <h4>{props.game.title}</h4>
        <img src="https://store-images.s-microsoft.com/image/apps.18145.14148865384803760.43665508-e225-4b8e-95bd-232694841824.392de630-5f87-44a6-8031-b1c503929ffb?mode=scale&q=90&h=1080&w=1920"></img>
      </div>
    )
}

export default GameIndexTile