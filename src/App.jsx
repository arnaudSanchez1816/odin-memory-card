import { useEffect, useState } from "react"
import "./App.css"
import GameView from "./components/views/GameView"
import { initializeDatabase } from "./database"
import { sleep } from "./utils"
import { createGame } from "./game"
import StartView from "./components/views/StartView"
import LoadingView from "./components/views/LoadingView"

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
            setLoading(false)
        }

        loadingDatabase()
    }, [])

    const onGoHomeClicked = () => {
        setGame(null)
    }

    const onNewGameClicked = () => {
        setGame(createGame({ ...game.options }))
    }

    if (loading) {
        return (
            <div className="app">
                <LoadingView />
            </div>
        )
    }

    const gameRunning = game != null
    if (gameRunning == false) {
        return (
            <div className="app">
                <StartView
                    onGameStart={() => {
                        setGame(createGame({ useAlternateSkins: false }))
                    }}
                />
            </div>
        )
    }

    return (
        <>
            <div className="app">
                <GameView
                    key={game.id}
                    game={game}
                    setGame={setGame}
                    onGoHomeClicked={onGoHomeClicked}
                    onNewGameClicked={onNewGameClicked}
                />
            </div>
        </>
    )
}

export default App
