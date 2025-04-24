import { useEffect, useState } from "react"
import "./App.css"
import GameView from "./components/views/GameView"
import { initializeDatabase } from "./database"

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))
let loadPromise = null
if (typeof window !== "undefined") {
    // Check if we're running in the browser.
    loadPromise = Promise.all([initializeDatabase(), sleep(5000)])
}

function App() {
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function loadingDatabase() {
            setLoading(true)
            await loadPromise
            setLoading(false)
        }

        loadingDatabase()
    }, [])

    return (
        <>
            {loading ? (
                <div>Loading !</div>
            ) : (
                <div className="app">
                    <GameView />
                </div>
            )}
        </>
    )
}

export default App
