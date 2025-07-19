import styles from "./searchCurrentFriends.module.css"
import NewMessageForm from "../forms/newMessageForm/NewMessageForm"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"


export default function SearchCurrentFriends() {
    const navigate = useNavigate()
    const [query, setQuery] = useState('')
    const [showFriendList, setShowFriendList] = useState(false)
    const [friendSelected, setFriendSelected] = useState('')
    const [friends, setFriends] = useState([])

    useEffect(() => {
        try {
            async function fetchFriends() {
                const token = localStorage.getItem("token")
                if (token) {
                    const apiUrl = import.meta.env.VITE_API_URL;
                    const res = await fetch(`${apiUrl}/api/friends`, {
                        mode: "cors",
                        method: "GET",
                        headers: {
                            "Authorization": `Bearer ${token}`
                        }
                    })

                    if (!res.ok) {
                        if (res.status === 403) {
                            navigate('/login')
                            return
                        }
                        throw new Error(res.status)
                    }
                    const data = await res.json();
                    setFriends(data.friends)

                } else {
                    navigate('/login')
                }

            }
            fetchFriends()
        } catch (error) {
            console.log("Error fetching friends for new message", error)
        }
    }, [])


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
        setQuery(friendSelected.firstName + ' ' + friendSelected.lastName)
        setFriendSelected('')
        setShowFriendList(true)
    }

    const filteredFriends = friends.filter(friend => {
        const name = friend.firstName + ' ' + friend.lastName;
        return (name.toLowerCase().startsWith(query.toLowerCase()))
    })

    return (
        <div className={styles.contentWrapper}>
            {friendSelected ?
                (<div>
                    <button onClick={changeFriendSelected}>
                        {friendSelected.firstName + ' ' + friendSelected.lastName}
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
                            <li key={friend.id} onClick={() => handleClick(friend)}>{friend.firstName + ' ' + friend.lastName}</li>
                        )
                    })}
                </ul>
            }

            <NewMessageForm friendSelected={friendSelected} redirectToConversation={true} />
        </div>
    )
}