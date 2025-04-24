import { getChampionImageName, getRandomChampions } from "../../database"
import "../../styles/GameView.css"
import ChampionCard from "../ChampionCard"

function GameView() {
    const randomChampions = getRandomChampions(6)

    return (
        <div className="game-view">
            <div className="cards-container">
                {randomChampions.map((champion) => {
                    const randomSkinIndex = Math.floor(
                        Math.random() * champion.skins.length
                    )
                    const skinImageName = getChampionImageName(
                        champion,
                        randomSkinIndex
                    )
                    return (
                        <ChampionCard
                            key={champion.key}
                            championName={champion.name}
                            spriteName={skinImageName}
                        />
                    )
                })}
            </div>
        </div>
    )
}

export default GameView
