import styles from "./pages.module.css"
import MainMenu from "../components/mainMenu/MainMenu"

export default function LandingPage() {
    return (
        <div className={styles.landingPageWrapper}>
            <h1 className={styles.projectTitle}>Messaging App</h1>
            <MainMenu />
        </div>
    )
}