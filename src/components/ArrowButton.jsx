import clsx from "clsx"
import "../styles/ArrowButton.css"

function ArrowButton({ children, onClick, onCancel = null, className }) {
    return (
        <div className={clsx("arrow-button", className)}>
            {!onCancel && <div className="logo"></div>}
            {onCancel && (
                <button className="circle" onClick={onCancel}>
                    <svg viewBox="0 0 35.5 35.5" width="10" height="10">
                        <path
                            class="cls-1"
                            fill="currentColor"
                            d="M23.41,17.75,34.33,6.83a4,4,0,1,0-5.66-5.66L17.75,12.09,6.83,1.17A4,4,0,0,0,1.17,6.83L12.09,17.75,1.17,28.67a4,4,0,0,0,5.66,5.66L17.75,23.41,28.67,34.33a4,4,0,0,0,5.66-5.66Z"
                        ></path>
                    </svg>
                </button>
            )}

            <button className="main" onClick={onClick}>
                {children}
            </button>
        </div>
    )
}

export default ArrowButton
