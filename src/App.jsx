import { useEffect, useState } from "react"
import "./App.css"
import GameView from "./components/views/GameView"
import { initializeDatabase } from "./database"
import { sleep } from "./utils"
import { createGame } from "./game"

let loadPromise = null
if (typeof window !== "undefined") {
    // Check if we're running in the browser.
    loadPromise = Promise.all([initializeDatabase(), sleep(1000)])
}

function App() {
    const [game, setGame] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function loadingDatabase() {
            setLoading(true)
            await loadPromise
            setGame(createGame(10))
            setLoading(false)
        }

        loadingDatabase()
    }, [])

    if (loading) {
        return (
            <div className="app">
                <div>Loading !</div>
            </div>
        )
    }

    const gameOver = game.remainingValidChoices.length <= 0

    return (
        <>
            <div className="app">
                {gameOver == false && (
                    <GameView game={game} setGame={setGame} />
                )}
                {gameOver && <div>Game over !!</div>}
            </div>
        </>
    )
}

export default App
