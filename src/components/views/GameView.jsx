import "../../styles/GameView.css"
import ChampionCard from "../ChampionCard"

function GameView() {
    return (
        <div className="game-view">
            <div className="cards-container">
                <ChampionCard />
                <ChampionCard />
                <ChampionCard />
                <ChampionCard />
                <ChampionCard />
                <ChampionCard />
            </div>
        </div>
    )
}

export default GameView
