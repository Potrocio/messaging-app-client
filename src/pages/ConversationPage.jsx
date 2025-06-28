import { useNavigate, useParams } from "react-router-dom"
import styles from "./pages.module.css"
import { useState } from "react"
import FriendMessages from "../components/friendMessages/FriendMessages"

export default function ConversationPage() {

    const navigate = useNavigate()
    const { id } = useParams()

    function handleHomeButtonClick() {
        navigate('/home')
    }
    const [messagePreview, setMessagePreview] = useState([
        {
            id: 1,
            name: "God",
            lastMessage: "I'm proud of you",
            lastMessageTimeStamp: new Date().toLocaleTimeString('en-US', {
                hour: 'numeric',
                minute: '2-digit',
                hour12: true,
            })
        },
        {
            id: 2,
            name: "Imaginary",
            lastMessage: "I think therefore I am",
            lastMessageTimeStamp: new Date().toLocaleTimeString('en-US', {
                hour: 'numeric',
                minute: '2-digit',
                hour12: true,
            })
        }
    ])

    const friendSelected = messagePreview.find(friend => {
        return friend.id == id
    })

    return (
        <div className={styles.contentWrapper}>
            <button className={styles.homeButton} onClick={handleHomeButtonClick}>Home</button>
            <p>{friendSelected.name}</p>
            <FriendMessages friendSelected={friendSelected} />
        </div>
    )
}