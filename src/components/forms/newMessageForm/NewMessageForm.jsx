import { useRef } from "react"
import styles from "./newMessageForm.module.css"
import { useState } from "react"
import { jwtDecode } from "jwt-decode"

export default function NewMessageForm({ friendSelected }) {
    const [message, setMessage] = useState('')
    const textareaRef = useRef(null)

    function handleInput(e) {
        const textarea = textareaRef.current;
        textarea.style.height = "auto"

        const scrollHeight = textarea.scrollHeight;
        const maxHeight = 150;

        // If scrollheight is bigger than the max height specified
        if (scrollHeight > maxHeight) {
            textarea.style.height = `${maxHeight}px`
            textarea.style.overflowY = 'auto'

            // If scrollheight is less than the max height specified
        } else {
            textarea.style.height = `${scrollHeight}px`
            textarea.style.overflowY = 'hidden'
        }
        setMessage(e.target.value)
    }

    async function handleFormSubmit(e) {
        e.preventDefault()
        // It would be nice if I can send a message instance, and redirect to that conversation instance
        if (friendSelected) {
            try {
                const token = localStorage.getItem("token")
                if (token) {
                    const apiUrl = import.meta.env.VITE_API_URL;
                    const decoded = jwtDecode(token)
                    const userId = Number(decoded.id)
                    const userA = userId < friendSelected.id ? userId : friendSelected.id;
                    const userB = userId > friendSelected.id ? userId : friendSelected.id;
                    const userKeyPair = `${userA},${userB}`
                    const content = message;

                    const res = await fetch(`${apiUrl}/api/conversations/`, {
                        mode: "cors",
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${token}`
                        },
                        body: JSON.stringify({ userKeyPair, content })
                    })
                    console.log(res.status)
                    if (!res.ok) throw new Error(res.status)
                }
            } catch (error) {
                console.log("Error sending new message", error)
            }
        }
    }


    return (
        <div className={styles.contentWrapper}>
            <form onSubmit={handleFormSubmit}>
                <textarea
                    name="message"
                    id="message"
                    rows="1"
                    ref={textareaRef}
                    value={message}
                    onInput={handleInput}
                ></textarea>
                <button className={styles.sendMessageButton} type="submit">Send</button>
            </form>
        </div>
    )
}