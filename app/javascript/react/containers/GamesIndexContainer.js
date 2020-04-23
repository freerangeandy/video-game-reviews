import React, { useState, useEffect } from "react"

import GamesIndexPane from "../components/GamesIndexPane"

const GamesIndexContainer = props => {
    const [games, setGames] = useState([])

    useEffect(() => {
        fetch("/api/v1/games.json")
        .then((response) => {
            if (response.ok) {
                return response
            } else {
                let errorMessage = `${response.status} (${response.statusText})`
                let error = new Error(errorMessage)
                throw(error)
            }
        })
        .then(response => response.json() )
        .then(body => {
            setGames(body)
        })
        .catch(error => console.error(`Error in fetch: ${error.message}`))
    }, [])

    return (
        <div className="grid-container game-index-margin">
            <GamesIndexPane gamesList={games} />
        </div>
    )
}

export default GamesIndexContainer