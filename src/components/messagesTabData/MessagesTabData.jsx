import { useContext, useState } from "react"
import styles from "./messagesTabData.module.css"
import { useNavigate } from "react-router-dom"
import { myContext } from "../../pages/HomePage"

export default function MessagesTabData() {
    const navigate = useNavigate();
    const { conversationsPreview } = useContext(myContext)
    console.log(conversationsPreview)

    function handleNewMessageClick() {
        navigate('/new-message')
    }

    // const [messagePreview, setMessagePreview] = useState([
    //     {
    //         id: 1,
    //         name: "God",
    //         lastMessage: "I'm proud of you",
    //         lastMessageTimeStamp: new Date().toLocaleTimeString('en-US', {
    //             hour: 'numeric',
    //             minute: '2-digit',
    //             hour12: true,
    //         })
    //     },
    //     {
    //         id: 2,
    //         name: "Imaginary",
    //         lastMessage: "Hii",
    //         lastMessageTimeStamp: new Date().toLocaleTimeString('en-US', {
    //             hour: 'numeric',
    //             minute: '2-digit',
    //             hour12: true,
    //         })
    //     }
    // ])

    function handleMessagePreviewClick(recipientId) {
        navigate(`/conversation/${recipientId}`)
    }

    return (
        <div className={styles.contentWrapper}>
            <ul className={styles.listWrapper}>
                {conversationsPreview.map(recipient => {
                    return (
                        <li key={recipient.id} onClick={() => handleMessagePreviewClick(recipient.id)}>
                            <p>{recipient.name}</p>
                            <p>{recipient.lastMessage}</p>
                            <p>{recipient.lastMessageTimeStamp}</p>
                        </li>
                    )
                })}
            </ul>
            <button className={styles.newMessageButton} onClick={handleNewMessageClick}>New Message</button>
        </div>
    )
}