import { useContext, useEffect, useState } from "react"
import styles from "./friendsTabData.module.css"
import { useNavigate } from "react-router-dom"
import { jwtDecode } from "jwt-decode"
import { myContext } from "../../pages/HomePage"


export default function FriendsTabData() {
    const navigate = useNavigate()
    const [menuOpened, setMenuOpened] = useState(false)
    const [removeFriendOn, setRemoveFriendOn] = useState(false)
    const [friendToRemove, setFriendToRemove] = useState({})
    const [personToReject, setPersonToReject] = useState({})
    const [showPending, setShowPending] = useState(false)
    const [pendingRequested, setPendingRequested] = useState([])
    const [pendingReceived, setPendingReceived] = useState([])

    const { friends, conversationsPreview } = useContext(myContext)

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
                if (!res.ok) {
                    if (res.status === 404) {
                        setPendingReceived([])
                        setPendingRequested([])
                    }
                    throw new Error(res.status)
                }
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

    useEffect(() => {
        fetchPendingList();
    }, [])

    function handleFriendClick(friendId) {
        const token = localStorage.getItem("token")
        if (token) {
            const decoded = jwtDecode(token)
            const userId = Number(decoded.id)
            const userA = userId < friendId ? userId : friendId;
            const userB = userId > friendId ? userId : friendId;
            const userKeyPair = `${userA},${userB}`
            const conversation = conversationsPreview.filter((conversation) => {
                return conversation.userKeyPair === userKeyPair;
            })
            // console.log(conversation[0])
            navigate(`/conversation/${conversation[0].id}`)
        } else {
            navigate('/login')
        }

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

    async function handleRemoveFriendRequest() {
        try {
            const token = localStorage.getItem("token")
            if (token) {
                const decoded = jwtDecode(token)
                const userId = Number(decoded.id)
                const userA = userId < personToReject.id ? userId : personToReject.id;
                const userB = userId > personToReject.id ? userId : personToReject.id;
                const userKeyPair = `${userA},${userB}`

                const apiUrl = import.meta.env.VITE_API_URL;
                const res = await fetch(`${apiUrl}/api/friends/key/${userKeyPair}`, {
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
        } finally {
            await fetchPendingList()
            setPersonToReject({})
            setShowPending(false)
        }
    }

    async function handleRemoveFriend() {
        try {
            const token = localStorage.getItem("token")
            if (token) {
                const decoded = jwtDecode(token)
                const userId = Number(decoded.id)
                const userA = userId < friendToRemove.id ? userId : friendToRemove.id;
                const userB = userId > friendToRemove.id ? userId : friendToRemove.id;
                const userKeyPair = `${userA},${userB}`

                const apiUrl = import.meta.env.VITE_API_URL;
                const res = await fetch(`${apiUrl}/api/friends/key/${userKeyPair}`, {
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
        } finally {
            await fetchPendingList()
            setFriendToRemove({})
            setRemoveFriendOn(false)
        }
    }

    function handleSelectPersonToReject(personObject) {
        setPersonToReject(personObject)
    }

    function handleCancelPersonToReject() {
        setPersonToReject({})
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

    async function handleAcceptFriendRequest(personObject) {
        try {
            const token = localStorage.getItem("token")
            if (token) {
                const decoded = jwtDecode(token)
                const userId = Number(decoded.id)
                const userA = userId < personObject.id ? userId : personObject.id;
                const userB = userId > personObject.id ? userId : personObject.id;
                const userKeyPair = `${userA},${userB}`

                const apiUrl = import.meta.env.VITE_API_URL;
                const res = await fetch(`${apiUrl}/api/friends`, {
                    mode: "cors",
                    method: "PATCH",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ userKeyPair })
                })
                if (!res.ok) throw new Error(res.status)
            } else {
                navigate("/login")
            }
        } catch (error) {
            console.log("Error accepting friend request", error)
        } finally {
            await fetchPendingList()
        }
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
            {personToReject.name && <div className={styles.backdrop}></div>}
            {personToReject.id &&
                <div className={styles.optionsWrapper}>
                    <p>Are you sure you want to reject? {personToReject.name}?</p>
                    <div>
                        <button onClick={handleRemoveFriendRequest}>Yes</button>
                        <button onClick={handleCancelPersonToReject}>No</button>
                    </div>
                </div>
            }

            {showPending ?
                (
                    <div className={styles.pendingWrapper}>
                        <button onClick={handleBackClick}>Back</button>
                        <ul>
                            {pendingReceived.map(person => {
                                return (
                                    <>
                                        <li key={person.id}>{person.firstName + ' ' + person.lastName}</li>
                                        <button onClick={() => handleAcceptFriendRequest(person)}>Accept</button>
                                        <button onClick={() => handleSelectPersonToReject(person)}>Reject</button>
                                    </>
                                )
                            })}
                            {pendingRequested.map(person => {
                                return (
                                    <>
                                        <li key={person.id}>{person.firstName + ' ' + person.lastName}</li>
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
                                        <p>{friend.firstName} {friend.lastName}</p>
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