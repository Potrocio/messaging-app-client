import { useRef } from "react"
import styles from "./newMessageForm.module.css"
import { useState } from "react"

export default function NewMessageForm({ friendSelected }) {
    const [value, setValue] = useState('')
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
        setValue(e.target.value)
    }

    function handleFormSubmit(e) {
        e.preventDefault()
        if (friendSelected) {
            // Temporarily display the recipient and the message
            const test = friendSelected.name + ' ' + value
            alert(test)
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
                    value={value}
                    onInput={handleInput}
                ></textarea>
                <button className={styles.sendMessageButton} type="submit">Send</button>
            </form>
        </div>
    )
}