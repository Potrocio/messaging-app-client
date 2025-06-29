import { useState } from "react"
import styles from "./friendsTabData.module.css"
import { useNavigate } from "react-router-dom"


export default function FriendsTabData() {
    const navigate = useNavigate()
    const [menuOpened, setMenuOpened] = useState(false)
    const [removeFriendOn, setRemoveFriendOn] = useState(false)
    const [friendToRemove, setFriendToRemove] = useState({})


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

    function handleFriendClick(friendId) {
        navigate(`/conversation/${friendId}`)
    }

    function handleShowOptions() {
        setMenuOpened(true)
    }

    function handleMenuClose() {
        setMenuOpened(false)
    }

    function handleToggleRemoveFriends() {
        setRemoveFriendOn(true)
        setMenuOpened(false)
    }

    function handleRemoveFriend(friendObject) {
        setFriendToRemove(friendObject)
    }

    function handleCancelFriendRemove() {
        setFriendToRemove({})
        setRemoveFriendOn(false)
    }

    function handleAddFriendClick() {
        navigate('/add-friend')
    }

    return (
        <div className={styles.contentWrapper}>
            {menuOpened && <div className={styles.backdrop}></div>}
            <button className={styles.optionsButton} onClick={handleShowOptions}>+</button>
            {menuOpened &&
                <div className={styles.optionsWrapper}>
                    <button className={styles.closeMenuButton} onClick={handleMenuClose}>X</button>
                    <button onClick={handleAddFriendClick}>Add friend</button>
                    <button>Pending friends</button>
                    <button onClick={handleToggleRemoveFriends}>Remove a friend</button>
                </div>}
            {friendToRemove.name && <div className={styles.backdrop}></div>}
            {friendToRemove.id &&
                <div className={styles.optionsWrapper}>
                    <p>Are you sure you want to remove {friendToRemove.name}?</p>
                    <div>
                        <button>Yes</button>
                        <button onClick={handleCancelFriendRemove}>No</button>
                    </div>
                </div>
            }
            <ul className={styles.friendsWrapper}>
                {friends.map(friend => {
                    return (
                        <>
                            <li key={friend.id} onClick={() => handleFriendClick(friend.id)}>
                                <p>{friend.name}</p>
                            </li>
                            {removeFriendOn && <button onClick={() => handleRemoveFriend(friend)}>Remove</button>}
                        </>
                    )
                })}
            </ul>
        </div>
    )
}