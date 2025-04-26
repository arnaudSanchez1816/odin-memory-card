import { useEffect, useRef, useState } from "react"
import "../../styles/GameView.css"
import ChampionCard from "../ChampionCard"
import { sleep } from "../../utils"
import Logo from "../Logo"

function GameOverModal({ isOpen, game, onNewGameClicked, onGoHomeClicked }) {
    const modalRef = useRef(null)

    useEffect(() => {
        if (isOpen) {
            modalRef.current?.showModal()
        } else {
            modalRef.current?.close()
        }
    }, [isOpen])

    const gameWon = game.remainingValidChoices.length <= 0
    const score = game.championsPool.length - game.remainingValidChoices.length
    const total = game.championsPool.length

    return (
        <dialog ref={modalRef} className="game-over-modal">
            <p>
                {gameWon ? (
                    <>
                        <span>Congratulations !</span>
                        <span>You found all the champions cards.</span>
                    </>
                ) : (
                    <>
                        <span>Game over !</span>
                        <span>You selected the same champion twice !</span>
                        <div className="game-score">
                            <span>Score : </span>
                            <span>
                                {score} / {total}
                            </span>
                        </div>
                    </>
                )}
            </p>

            <div className="game-over-controls">
                <button
                    type="button"
                    className="new-game-btn button is-primary"
                    onClick={onNewGameClicked}
                >
                    New game
                </button>
                <button
                    type="button"
                    className="home-btn button is-primary"
                    onClick={onGoHomeClicked}
                >
                    Home
                </button>
            </div>
        </dialog>
    )
}

function GameView({ game, setGame, onGoHomeClicked, onNewGameClicked }) {
    const nbChampionsPerRound = 5

    const [flipped, setFlipped] = useState(true)
    const [displayedChampions, setDisplayedChampions] = useState(
        game.getChampionsToDisplay(nbChampionsPerRound)
    )

    useEffect(() => {
        const flipCard = async () => {
            await sleep(500)
            setFlipped(false)
        }

        flipCard()
    }, [displayedChampions])

    const onCardClicked = async (id) => {
        if (flipped) {
            return
        }

        const remainingChamps = game.remainingValidChoices.filter(
            (item) => id !== item
        )
        let gameOver =
            remainingChamps.length == game.remainingValidChoices.length ||
            remainingChamps.length <= 0

        setGame({
            ...game,
            gameOver: gameOver,
            remainingValidChoices: remainingChamps,
        })
        if (gameOver == false) {
            // new round
            // Wait for card flipping anim
            setFlipped(true)
            await sleep(500)
            setDisplayedChampions(
                game.getChampionsToDisplay(nbChampionsPerRound)
            )
        }
    }

    const score = game.championsPool.length - game.remainingValidChoices.length
    const total = game.championsPool.length
    const gameOver = game.gameOver

    return (
        <div className="game-view view">
            <header className="game-view-header view-header">
                <Logo onClick={onGoHomeClicked} />
            </header>
            <main className="view-content">
                <div className="game-details">
                    <button
                        type="button"
                        className="back-home-btn button is-secondary is-tiny"
                        onClick={onGoHomeClicked}
                    >
                        Home
                    </button>
                    <div className="game-score">
                        <span>
                            {score} / {total}
                        </span>
                    </div>
                </div>
                <div className="cards-container">
                    {displayedChampions.map((champion) => {
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
                <GameOverModal
                    isOpen={gameOver}
                    game={game}
                    onNewGameClicked={onNewGameClicked}
                    onGoHomeClicked={onGoHomeClicked}
                />
            </main>
        </div>
    )
}

export default GameView
