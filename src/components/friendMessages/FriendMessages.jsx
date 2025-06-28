import { useState } from "react"
import styles from "./friendMessages.module.css"
import NewMessageForm from "../forms/newMessageForm/NewMessageForm"

export default function FriendMessages({ friendSelected }) {
    const [user, setUser] = useState('John')
    const [messages, setMessages] = useState([
        {
            recipient: "God",
            message: "Hi",
            timeStamp: new Date().toLocaleTimeString('en-US', {
                hour: 'numeric',
                minute: '2-digit',
                hour12: true,
            })
        },
        {
            recipient: "John",
            message: "Hello",
            timeStamp: new Date().toLocaleTimeString('en-US', {
                hour: 'numeric',
                minute: '2-digit',
                hour12: true,
            })
        },
        {
            recipient: "God",
            message: "I love you",
            timeStamp: new Date().toLocaleTimeString('en-US', {
                hour: 'numeric',
                minute: '2-digit',
                hour12: true,
            })
        },
        {
            recipient: "John",
            message: "Thank you",
            timeStamp: new Date().toLocaleTimeString('en-US', {
                hour: 'numeric',
                minute: '2-digit',
                hour12: true,
            })
        },
    ])
    return (
        <div className={styles.contentWrapper}>
            {/* <div className={styles.messagesWrapper}> */}
            <ul className={styles.messagesWrapper}>
                {messages.map(message => {
                    return (
                        <li className={`${message.recipient == user ? styles.userMessageContainer : styles.recipientMessageContainer}`}>
                            <p>{message.message}</p>
                            <p>{message.timeStamp}</p>
                        </li>
                    )
                })}
            </ul>
            {/* </div> */}
            <NewMessageForm friendSelected={friendSelected} />
        </div>
    )
}