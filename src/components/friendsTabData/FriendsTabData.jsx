import { useState } from "react"
import styles from "./friendsTabData.module.css"


export default function FriendsTabData() {
    const [friends, setFriends] = useState([
        {
            id: 1,
            name: "God"
        },
        {
            id: 2,
            name: "Imaginary"
        }
    ])

    return (
        <div className={styles.contentWrapper}>
            <div className={styles.optionsWrapper}>
                <button>Add friend</button>
                <button>Pending friends</button>
            </div>
            <ul className={styles.friendsWrapper}>
                {friends.map(friend => {
                    return (
                        <li key={friend.id}>
                            <p>{friend.name}</p>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}