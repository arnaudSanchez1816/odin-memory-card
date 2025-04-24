import { useEffect, useRef, useState } from "react"
import "../styles/ChampionCard.css"
import { clsx } from "clsx/lite"
import { getChampionImagePath, lerp } from "../utils"
import lolLogo from "/src/assets/lol-logo.png"

function ChampionCard() {
    const name = "Aatrox"
    const imageName = "Aatrox_0.jpg"

    const [flipped, setFlipped] = useState(false)
    const cardRef = useRef(null)

    useEffect(() => {
        const perspectiveValue = "1000px"

        const ref = cardRef.current

        const applyCardEffect = (e) => {
            const refRect = ref.getBoundingClientRect()

            const offsetX = e.x - refRect.x
            const offsetY = e.y - refRect.y
            const yAngle = lerp(-15, 15, offsetX / refRect.width)
            const xAngle = lerp(10, -10, offsetY / refRect.height)
            ref.style.transform = `perspective(${perspectiveValue}) rotateY(${yAngle}deg) rotateX(${xAngle}deg) scale3d(1,1,1)`
        }

        const resetCardEffect = () => {
            ref.style.transform = `perspective(${perspectiveValue}) rotateY(0deg) rotateX(0deg) scale3d(1,1,1)`
        }

        if (ref) {
            ref.addEventListener("mousemove", applyCardEffect)
            ref.addEventListener("mouseleave", resetCardEffect)
        }

        return () => {
            if (ref) {
                ref.removeEventListener("mousemove", applyCardEffect)
                ref.removeEventListener("mouseleave", resetCardEffect)
            }
        }
    })

    return (
        <div
            className="champion-card"
            data-hidden="false"
            ref={cardRef}
            onClick={() => setFlipped(!flipped)}
        >
            <div className={clsx("card-flip-wrapper", flipped && "flipped")}>
                <button className="face">
                    <picture>
                        <source
                            srcSet={getChampionImagePath(imageName)}
                            media="(min-width: 1100px)"
                        />
                        <img
                            className="champion-img"
                            src={getChampionImagePath(imageName, true)}
                            alt="Champion image"
                        />
                    </picture>
                    <div className="champion-name">{name}</div>
                </button>
                <div className="back">
                    <img
                        className="champion-card-logo"
                        src={lolLogo}
                        alt="League of Legends logo"
                    />
                </div>
            </div>
        </div>
    )
}

export default ChampionCard
