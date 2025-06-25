import { useNavigate } from "react-router-dom"
import styles from "./mainMenu.module.css"

export default function MainMenu() {
    const navigate = useNavigate();

    function handleClickLogin() {
        navigate("/login")
    }

    function handleClickSignup() {
        navigate("/signup")
    }

    return (
        <div className={styles.menuWrapper}>
            <button
                className={styles.loginButton}
                onClick={handleClickLogin}
            >Log in</button>

            <button
                className={styles.signupButton}
                onClick={handleClickSignup}
            >Sign up</button>
        </div>
    )
}