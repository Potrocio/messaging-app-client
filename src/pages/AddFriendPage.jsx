import styles from "./pages.module.css"
import AddFriendsForm from "../components/forms/addFriendsForm/AddFriendsForm"

export default function AddFriendPage() {
    return (
        <div className={styles.contentWrapper}>
            <AddFriendsForm />
        </div>
    )
}