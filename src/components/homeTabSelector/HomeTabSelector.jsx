import styles from "./homeTabSelector.module.css"

export default function HomeTabSelector({ tabSelected, setTabSelected }) {

    function selectMessagesTab() {
        setTabSelected("Messages")
    }

    function selectFriendsTab() {
        setTabSelected("Friends")
    }

    return (
        <div className={styles.contentWrapper}>
            <button onClick={selectMessagesTab} className={`${styles.messagesButton} ${tabSelected == "Messages" ? styles.buttonClicked : ''}`}>Messages</button>
            <button onClick={selectFriendsTab} className={`${styles.friendsButton} ${tabSelected == "Friends" ? styles.buttonClicked : ''}`}>Friends</button>
        </div >
    )
}