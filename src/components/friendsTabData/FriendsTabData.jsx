import { useEffect, useState } from "react"
import styles from "./friendsTabData.module.css"
import { useNavigate } from "react-router-dom"


export default function FriendsTabData() {
    const navigate = useNavigate()
    const [menuOpened, setMenuOpened] = useState(false)
    const [removeFriendOn, setRemoveFriendOn] = useState(false)
    const [friendToRemove, setFriendToRemove] = useState({})
    const [showPending, setShowPending] = useState(false)
    const [pendingRequested, setPendingRequested] = useState([])
    const [pendingReceived, setPendingReceived] = useState([])

    useEffect(() => {
        async function fetchPendingList() {
            try {
                const token = localStorage.getItem("token")
                if (token) {
                    const apiUrl = import.meta.env.VITE_API_URL;
                    const res = await fetch(`${apiUrl}/api/friends/pending`, {
                        mode: "cors",
                        method: "GET",
                        headers: { "Authorization": `Bearer ${token}` }
                    })
                    if (!res.ok) throw new Error(res.status)
                    const data = await res.json()

                    const friendIdRequested = data.friendsList.filter((friend) => {
                        return friend.friendId !== friend.requestedBy
                    }).map((friend) => { return friend.friendId })

                    const friendIdReceived = data.friendsList.filter((friend) => {
                        return friend.friendId === friend.requestedBy
                    }).map((friend) => { return friend.friendId })

                    const friendsRequested = data.friendData.filter((friend) => {
                        return friendIdRequested.includes(friend.id)
                    })

                    const friendsReceived = data.friendData.filter((friend) => {
                        return friendIdReceived.includes(friend.id)
                    })

                    setPendingRequested(friendsRequested)
                    setPendingReceived(friendsReceived)

                } else {
                    navigate('/login')
                }
            } catch (error) {
                console.log("Error fetching pending friend list", error)
            }
        }
        fetchPendingList();
    }, [showPending])


    const [friends, setFriends] = useState([
        {
            id: 1,
            name: "God",
            userKeyPair: "1,2"
        },
        {
            id: 2,
            name: "Imaginary",
            userKeyPair: "1,3"
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

    async function handleRemoveFriend() {
        try {
            const token = localStorage.getItem("token")
            if (token) {
                const apiUrl = import.meta.env.VITE_API_URL;
                const res = await fetch(`${apiUrl}/api/friends/key/${friendToRemove.userKeyPair}`, {
                    mode: "cors",
                    method: "DELETE",
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                })
                if (!res.ok) throw new Error(res.status)
            } else {
                navigate("/login")
            }
        } catch (error) {
            console.log("Error deleting friend", error)
        }
    }

    function handleSelectFriendToDelete(friendObject) {
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
                        <button onClick={handleRemoveFriend}>Yes</button>
                        <button onClick={handleCancelFriendRemove}>No</button>
                    </div>
                </div>
            }

            {showPending ?
                (
                    <div className={styles.pendingWrapper}>
                        <button onClick={handleBackClick}>Back</button>
                        <ul>
                            {pendingReceived.map(request => {
                                return (
                                    <>
                                        <li>{request.firstName + ' ' + request.lastName}</li>
                                        <button>Accept</button>
                                        <button>Reject</button>
                                    </>
                                )
                            })}
                            {pendingRequested.map(request => {
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
                                    {removeFriendOn && <button onClick={() => handleSelectFriendToDelete(friend)}>Remove</button>}
                                </>
                            )
                        })}
                    </ul>
                )
            }

        </div>
    )
}