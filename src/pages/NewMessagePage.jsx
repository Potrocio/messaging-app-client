import styles from "./pages.module.css"
import SearchCurrentFriends from "../components/searchCurrentFriends/SearchCurrentFriends"

export default function NewMessagePage() {
    return (
        <div className={styles.newMessagePageWrapper}>
            <SearchCurrentFriends />
        </div>
    )
}