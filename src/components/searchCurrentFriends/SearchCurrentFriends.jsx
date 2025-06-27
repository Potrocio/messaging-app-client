import { useState } from "react"
import styles from "./searchCurrentFriends.module.css"

export default function SearchCurrentFriends() {
    const [query, setQuery] = useState('')
    const [showFriendList, setShowFriendList] = useState(false)
    const [friendSelected, setFriendSelected] = useState('')

    function handleQueryChange(e) {
        setQuery(e.target.value)
    }

    function autoToggleFriendsList() {
        if (!query) {
            setShowFriendList(prev => !prev)
        }
    }

    function closeFriendsList() {
        setShowFriendList(false)
    }

    function handleClick(friendObject) {
        setFriendSelected(friendObject)
        setShowFriendList(false)
    }

    function changeFriendSelected() {
        setQuery(friendSelected.name)
        setFriendSelected('')
        setShowFriendList(true)
    }

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

    const filteredFriends = friends.filter(friend => {
        return (friend.name.toLowerCase().startsWith(query.toLowerCase()))
    })

    return (
        <div className={styles.contentWrapper}>
            {friendSelected ?
                (<div>
                    <button onClick={changeFriendSelected}>
                        {friendSelected.name}
                    </button>
                </div>)
                :
                (<div className={styles.searchBarWrapper}>
                    <input
                        type="text"
                        name="friend"
                        id="friend"
                        value={query}
                        onChange={handleQueryChange}
                        onClick={autoToggleFriendsList}
                    />
                </div>)
            }

            {showFriendList &&
                <ul>
                    <div className={styles.exitFriendsList} onClick={closeFriendsList}>X</div>
                    {filteredFriends.map(friend => {
                        return (
                            <li key={friend.id} onClick={() => handleClick(friend)}>{friend.name}</li>
                        )
                    })}
                </ul>
            }
        </div>
    )
}