import "../styles/Logo.css"
import lolLogoImg from "../assets/League_of_Legends_2019_vector.svg"
import clsx from "clsx"

function Logo({ onClick, className }) {
    let logoContent = (
        <div className={clsx("logo-container", className)}>
            <img
                className="logo-img"
                src={lolLogoImg}
                alt="League of Legends logo"
            />
            <h1 className="logo-subtitle">Memory Game</h1>
        </div>
    )

    if (onClick) {
        logoContent = (
            <button className="logo-btn" onClick={onClick}>
                {logoContent}
            </button>
        )
    }

    return logoContent
}

export default Logo
