import "../../styles/LoadingView.css"
import Logo from "../Logo"

function LoadingView() {
    return (
        <div className="loading-view view">
            <header className="loading-view-header view-header">
                <Logo />
            </header>
            <main className="loading-view-content view-content">
                <span>Loading...</span>
            </main>
        </div>
    )
}

export default LoadingView
