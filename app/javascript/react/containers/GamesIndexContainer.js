import React, { useState, useEffect } from "react"

import GameIndexTile from "../components/GameIndexTile"

const GamesIndexContainer = props => {
    const testGamesList = [{title: "Knack"}, {title: "Sekiro: Shadows Die Twice"}, {title: "Death Stranding"}, {title: "Civilization"}, {title: "Mario Kart"}, {title: "Catan Universe"} ]
    const gameTileList = testGamesList.map((game, index) => {
        return(
            <GameIndexTile 
                key={index}
                title={game.title}
            />
        )
     })
     
    return(
        <div>
            {gameTileList}
        </div>
    )
}

export default GamesIndexContainer