import styles from "./homeTabSelector.module.css"

export default function HomeTabSelector({ setTabSelected }) {

    function selectMessagesTab() {
        setTabSelected("Messages")
    }

    function selectFriendsTab() {
        setTabSelected("Friends")
    }

    return (
        <div className={styles.contentWrapper}>
            <button onClick={selectMessagesTab}>Messages</button>
            <button onClick={selectFriendsTab}>Friends</button>
        </div>
    )
}