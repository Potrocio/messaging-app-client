import { useState } from "react"
import styles from "./friendsTabData.module.css"
import { useNavigate } from "react-router-dom"


export default function FriendsTabData() {
    const navigate = useNavigate()
    const [menuOpened, setMenuOpened] = useState(false)
    const [removeFriendOn, setRemoveFriendOn] = useState(false)
    const [friendToRemove, setFriendToRemove] = useState({})
    const [showPending, setShowPending] = useState(false)
    const [fakePendingList, setFakePendingList] = useState({
        pendingSent: [
            {
                id: 1,
                firstName: "first",
                lastName: "person",
            }
        ],
        pendingReceived: [
            {
                id: 2,
                firstName: "second",
                lastName: "person",
            }
        ]
    })


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

    function handlePendingClick() {
        setShowPending(true)
        setMenuOpened(false)
    }

    function handleBackClick() {
        setShowPending(false)
    }

    return (
        <div className={styles.contentWrapper}>
            <button className={styles.optionsButton} onClick={handleShowOptions}>+</button>

            {menuOpened && <div className={styles.backdrop}></div>}
            {menuOpened &&
                <div className={styles.optionsWrapper}>
                    <button className={styles.closeMenuButton} onClick={handleMenuClose}>X</button>
                    <button onClick={handleAddFriendClick}>Add friend</button>
                    <button onClick={handlePendingClick}>Pending friends</button>
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

            {showPending ?
                (
                    <div className={styles.pendingWrapper}>
                        <button onClick={handleBackClick}>Back</button>
                        <ul>
                            {fakePendingList.pendingReceived.map(request => {
                                return (
                                    <>
                                        <li>{request.firstName + ' ' + request.lastName}</li>
                                        <button>Accept</button>
                                        <button>Reject</button>
                                    </>
                                )
                            })}
                            {fakePendingList.pendingSent.map(request => {
                                return (
                                    <>
                                        <li>{request.firstName + ' ' + request.lastName}</li>
                                        <div>Pending</div>
                                    </>
                                )
                            })}
                        </ul>
                    </div>
                )
                :
                (
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
                )
            }

        </div>
    )
}