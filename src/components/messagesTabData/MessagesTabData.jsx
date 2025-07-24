import { useContext, useState } from "react"
import styles from "./messagesTabData.module.css"
import { useNavigate } from "react-router-dom"
import { myContext } from "../../pages/HomePage"

export default function MessagesTabData() {
    const navigate = useNavigate();
    const { conversationsPreview } = useContext(myContext)
    // const conversationsPreview = [{ messages: ["hello"] }]

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


    function handleMessagePreviewClick(conversationId) {
        navigate(`/conversation/${conversationId}`)
    }

    return (
        <div className={styles.contentWrapper}>
            <button className={styles.newMessageButton} onClick={handleNewMessageClick}>New Message</button>
            <ul className={styles.listWrapper}>
                {conversationsPreview.map(conversation => {
                    const words = conversation.messages[0].content.split(" ")
                    const messagePreview = words.length <= 15 ? conversation.messages[0].content : words.slice(0, 15).join(" ") + " ..."
                    const isoTime = conversation.messages[0].createdAt;
                    const date = new Date(isoTime);
                    const hours = date.getHours();
                    const minutes = date.getMinutes();

                    const twelveHour = hours % 12 || 12; // Convert 0 to 12 for 12-hour clock
                    const amPm = hours >= 12 ? "PM" : "AM";

                    // Add leading zero if needed
                    const paddedHour = twelveHour.toString().padStart(2, '0');
                    const paddedMinutes = minutes.toString().padStart(2, '0');

                    const formattedTime = `${paddedHour}:${paddedMinutes} ${amPm}`;

                    return (
                        <li key={conversation.id} onClick={() => handleMessagePreviewClick(conversation.id)}>
                            <p>{conversation.messages[0].receiverFirstName}</p>
                            <p>{messagePreview}</p>
                            <p>{formattedTime}</p>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}