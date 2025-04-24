import { useEffect, useMemo, useState } from "react"
import { createGame } from "../../game"
import "../../styles/GameView.css"
import ChampionCard from "../ChampionCard"
import { sleep } from "../../utils"

function GameView() {
    const [game, setGame] = useState(createGame(10))
    const [flipped, setFlipped] = useState(true)

    const championsToDisplay = useMemo(() => {
        return game.getChampionsToDisplay(5)
    }, [game])

    useEffect(() => {
        const flipCard = async () => {
            await sleep(1000)
            setFlipped(false)
        }

        flipCard()
    }, [championsToDisplay])

    const onCardClicked = async (id) => {
        setFlipped(true)
        await sleep(1000)
        const remainingChamps = game.remainingValidChoices.filter(
            (item) => id !== item
        )
        setGame({ ...game, remainingValidChoices: remainingChamps })
    }

    return (
        <div className="game-view">
            <div className="cards-container">
                {championsToDisplay.map((champion) => {
                    return (
                        <ChampionCard
                            key={champion.id}
                            id={champion.id}
                            championName={champion.name}
                            spriteName={champion.image}
                            isFlipped={flipped}
                            onClicked={onCardClicked}
                        />
                    )
                })}
            </div>
        </div>
    )
}

export default GameView
