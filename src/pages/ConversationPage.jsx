import { useNavigate, useParams } from "react-router-dom"
import styles from "./pages.module.css"
import { useEffect, useState } from "react"
import FriendMessages from "../components/friendMessages/FriendMessages"
import { jwtDecode } from "jwt-decode"

export default function ConversationPage() {

    const navigate = useNavigate()
    const { id } = useParams()

    function handleHomeButtonClick() {
        navigate('/home')
    }
    const [conversation, setConversation] = useState({})
    const [friend, setFriend] = useState({})

    useEffect(() => {
        async function fetchConversation() {
            try {
                const token = localStorage.getItem("token")
                if (token) {
                    const apiUrl = import.meta.env.VITE_API_URL;
                    const res = await fetch(`${apiUrl}/api/conversations/${id}`, {
                        mode: "cors",
                        method: "GET",
                        headers: { "Authorization": `Bearer ${token}` }
                    })
                    if (!res.ok) {
                        if (res.status === 403) {
                            navigate('/login')
                            return
                        }
                        throw new Error(res.status)
                    }
                    const data = await res.json()
                    setConversation(data.conversation)
                }
            } catch (error) {
                console.log("Error fetching conversation", error)
            }
        }
        fetchConversation()
    }, [])

    useEffect(() => {
        async function fetchFriend() {

            try {
                if (conversation.length === 0) return
                const token = localStorage.getItem("token")
                if (token) {
                    const decoded = jwtDecode(token)
                    const userId = Number(decoded.id)
                    const userA = conversation.userA;
                    const userB = conversation.userB;
                    const friendId = userId === userA ? userB : userA;

                    if (!friendId) throw new Error("Friend id not defined")

                    const apiUrl = import.meta.env.VITE_API_URL;
                    const res = await fetch(`${apiUrl}/api/user/${friendId}`, {
                        mode: "cors",
                        method: "GET",
                        headers: { "Authorization": `Bearer ${token}` }
                    })
                    if (!res.ok) {
                        if (res.status === 403) {
                            navigate('/login')
                            return
                        }
                        throw new Error(res.status)
                    }
                    const data = await res.json()
                    setFriend(data.friend)
                }
            } catch (error) {
                console.log("Error fetching friend", error)
            }
        }
        fetchFriend()
    }, [conversation])

    return (
        <>
            {Object.keys(conversation).length === 0 || Object.keys(friend).length === 0
                ? <div>Loading...</div>
                :
                < div className={styles.contentWrapper} >
                    <button className={styles.homeButton} onClick={handleHomeButtonClick}>Home</button>
                    <p>{friend.firstName}</p>
                    <FriendMessages friendSelected={friend} conversation={conversation} />
                </div >
            }
        </>
    )
}