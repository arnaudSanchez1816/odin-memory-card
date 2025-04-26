import { useRef, useState } from "react"
import { totalChampionsInDatabase } from "../../database"
import "../../styles/StartView.css"
import ArrowButton from "../ArrowButton"
import Logo from "../Logo"
import { GAME_DEFAULT_OPTIONS } from "../../game"

function GameOptions({ formRef, onValidFormSubmitted }) {
    const [gameOptions, setGameOptions] = useState({
        totalChampions: GAME_DEFAULT_OPTIONS.totalChampions,
        championsPerRound: GAME_DEFAULT_OPTIONS.championsPerRound,
        useAlternateSkins: GAME_DEFAULT_OPTIONS.useAlternateSkins,
    })

    const [errors, setErrors] = useState({})

    const totalChampionsInDb = totalChampionsInDatabase()

    const onInputChange = (e) => {
        const { name, value } = e.target

        const newOptions = {
            ...gameOptions,
            [name]: value.replace(/\D/, ""),
        }
        setGameOptions(newOptions)
        setErrors(validateForm(newOptions))
    }

    const onSkinInputChange = (e) => {
        const { name, value } = e.target

        const newOptions = {
            ...gameOptions,
            [name]: value.toLowerCase() === "true",
        }
        setGameOptions(newOptions)
        setErrors(validateForm(newOptions))
    }

    const onFormSubmitted = (e) => {
        e.preventDefault()
        const errors = validateForm(gameOptions)
        setErrors(errors)
        if (Object.keys(errors) <= 0) {
            onValidFormSubmitted(gameOptions)
        }
    }

    const validateForm = (data) => {
        const errors = {}
        const totalChampions = parseInt(data.totalChampions)
        if (totalChampions <= 0 || totalChampions > totalChampionsInDb) {
            errors.totalChampions = `Value must be between 1 and ${totalChampionsInDb}`
        }

        const championsPerRound = parseInt(data.championsPerRound)

        if (championsPerRound <= 0 || championsPerRound > totalChampions) {
            errors.championsPerRound = `Value must be between 1 and ${totalChampions}`
        }

        return errors
    }

    return (
        <div className="game-options">
            <h2>Game options</h2>
            <form onSubmit={onFormSubmitted} ref={formRef}>
                <div className="game-options-item">
                    {errors.totalChampions && (
                        <span className="error">{errors.totalChampions}</span>
                    )}
                    <label className="label" htmlFor="total-champions">
                        Champions to find
                    </label>
                    <input
                        className="input"
                        type="tel"
                        id="total-champions"
                        name="totalChampions"
                        value={gameOptions.totalChampions}
                        onChange={onInputChange}
                    />
                </div>
                <div className="game-options-item">
                    {errors.championsPerRound && (
                        <span className="error">
                            {errors.championsPerRound}
                        </span>
                    )}
                    <label className="label" htmlFor="champions-per-round">
                        Revealed champions
                    </label>
                    <input
                        className="input"
                        type="tel"
                        id="champions-per-round"
                        name="championsPerRound"
                        value={gameOptions.championsPerRound}
                        onChange={onInputChange}
                    />
                </div>
                <div className="game-options-item">
                    <span className="label">Use alternate skins</span>
                    <div className="skin-radios">
                        <div className="input-radio">
                            <label htmlFor="default-skin">Yes</label>
                            <input
                                className="input"
                                type="radio"
                                id="default-skin"
                                name="useAlternateSkins"
                                value="true"
                                checked={gameOptions.useAlternateSkins}
                                onChange={onSkinInputChange}
                            />
                        </div>
                        <div className="input-radio">
                            <label htmlFor="alternate-skin">No</label>
                            <input
                                className="input"
                                type="radio"
                                id="alternate-skin"
                                name="useAlternateSkins"
                                value="false"
                                checked={!gameOptions.useAlternateSkins}
                                onChange={onSkinInputChange}
                            />
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

function StartView({ onGameStart }) {
    const gameOptionsFormRef = useRef(null)
    const onPlayClicked = () => {
        gameOptionsFormRef.current?.requestSubmit()
    }

    const onGameOptionsValidated = (options) => {
        onGameStart(options)
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
                <GameOptions
                    formRef={gameOptionsFormRef}
                    onValidFormSubmitted={onGameOptionsValidated}
                />
            </main>
        </div>
    )
}

export default StartView
