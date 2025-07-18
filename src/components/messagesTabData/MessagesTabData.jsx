import { useContext, useState } from "react"
import styles from "./messagesTabData.module.css"
import { useNavigate } from "react-router-dom"
import { myContext } from "../../pages/HomePage"

export default function MessagesTabData() {
    const navigate = useNavigate();
    const { conversationsPreview } = useContext(myContext)
    // const conversationsPreview = [{ messages: ["hello"] }]
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
                    const words = recipient.messages[0].content.split(" ")
                    const messagePreview = words.length <= 15 ? recipient.messages[0].content : words.slice(0, 15).join(" ") + " ..."
                    const isoTime = recipient.messages[0].createdAt
                    const date = new Date(isoTime)
                    const hours = date.getHours();
                    const minutes = date.getMinutes();
                    const twelveHour = hours % 12 || 12; // 0 becomes 12
                    const amPm = hours >= 12 ? "PM" : "AM";

                    return (
                        <li key={recipient.id} onClick={() => handleMessagePreviewClick(recipient.id)}>
                            <p>{recipient.messages[0].receiverFirstName}</p>
                            <p>{messagePreview}</p>
                            <p>{`${twelveHour}:${minutes} ${amPm}`}</p>
                        </li>
                    )
                })}
            </ul>
            <button className={styles.newMessageButton} onClick={handleNewMessageClick}>New Message</button>
        </div>
    )
}