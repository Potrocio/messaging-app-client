import { useNavigate } from "react-router-dom"
import styles from "./accountCreatedMenu.module.css"

export default function AccountCreatedMenu() {

    const navigate = useNavigate()

    function handleClick() {
        navigate("/login")
    }

    return (
        <>
            <div className={styles.backdrop}></div>
            <div className={styles.menuWrapper}>
                <p className={styles.message}>Account created successfully</p>
                <button className={styles.redirectButton} onClick={handleClick}>Back to login</button>
            </div>
        </>
    )
}