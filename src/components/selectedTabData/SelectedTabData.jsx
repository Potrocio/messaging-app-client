import { useState } from "react"
import styles from "./selectedTabData.module.css"
import MessagesTabData from "../messagesTabData/MessagesTabData"
import FriendsTabData from "../friendsTabData/FriendsTabData"

export default function SelectedTabData({ tabSelected }) {

    return (
        <div className={styles.contentWrapper}>
            {tabSelected == "Messages" && <MessagesTabData />}
            {tabSelected == "Friends" && <FriendsTabData />}
        </div>
    )
}