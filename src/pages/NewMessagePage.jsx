import styles from "./pages.module.css"
import SearchCurrentFriends from "../components/searchCurrentFriends/SearchCurrentFriends"
import { useNavigate } from "react-router-dom"

export default function NewMessagePage() {
    const navigate = useNavigate()

    function handleHomeClick() {
        navigate('/home')
    }

    return (
        <div className={styles.newMessagePageWrapper}>
            <button className={styles.homeButton} onClick={handleHomeClick}>Home</button>
            <SearchCurrentFriends />
        </div>
    )
}