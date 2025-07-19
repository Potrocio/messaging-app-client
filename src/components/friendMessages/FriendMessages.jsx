import styles from "./friendMessages.module.css"
import NewMessageForm from "../forms/newMessageForm/NewMessageForm"
import { jwtDecode } from "jwt-decode"
import { useNavigate } from "react-router-dom"
import { useState } from "react";

export default function FriendMessages({ friendSelected, conversation }) {
    const navigate = useNavigate();
    const token = localStorage.getItem("token")
    const decode = jwtDecode(token)
    if (!token) {
        navigate('/login')
    }
    const userId = Number(decode.id)

    return (
        <div className={styles.contentWrapper}>
            <ul className={styles.messagesWrapper}>
                {conversation.messages.map(message => {
                    const isoTime = message.createdAt;
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
                        <li className={`${message.senderId == userId ? styles.userMessageContainer : styles.recipientMessageContainer}`}>
                            <p>{message.content}</p>
                            <p>{formattedTime}</p>
                        </li>
                    )
                })}
            </ul>
            <NewMessageForm friendSelected={friendSelected} />
        </div>
    )
}