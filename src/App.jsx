import { useEffect, useState } from "react"
import "./App.css"
import GameView from "./components/views/GameView"
import { getRandomChampions, initializeDatabase } from "./database"

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))
let loadPromise = null
if (typeof window !== "undefined") {
    // Check if we're running in the browser.
    loadPromise = initializeDatabase()
    await Promise.all([loadPromise, sleep(5000)])
}

function App() {
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        async function loadingDatabase() {
            setLoading(true)
            await loadPromise
            setLoading(false)

            const champions = getRandomChampions(10)
            console.log(champions)
        }

        loadingDatabase()
    })

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
