import "../../styles/StartView.css"
import ArrowButton from "../ArrowButton"
import Logo from "../Logo"

function StartView({ onGameStart }) {
    const onPlayClicked = () => {
        onGameStart()
    }

    return (
        <div className="start-view view">
            <header className="start-view-header view-header">
                <Logo />
            </header>
            <main className="start-view-content view-content">
                <p className="game-rules">
                    Click on every champion once to win the game.
                </p>
                <ArrowButton className="play-button" onClick={onPlayClicked}>
                    Play
                </ArrowButton>
            </main>
        </div>
    )
}

export default StartView
