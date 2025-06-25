import { useState } from "react"
import styles from "./pages.module.css"
import { useNavigate } from "react-router-dom"

// I must modularize my code more, I will create a form component

export default function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isAuthenticated, setIsAuthenticated] = useState(true)
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()


    function handleEmailChange(e) {
        setEmail(e.target.value)
    }

    function handlePasswordChange(e) {
        setPassword(e.target.value)
    }

    function handleFormSubmit(e) {
        e.preventDefault()
        navigate("/home")
    }

    return (
        <div className={styles.loginPageWrapper}>
            <h2 className={styles.loginTitle}>Account</h2>
            <form onSubmit={handleFormSubmit}>
                <div className={styles.emailWrapper}>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={handleEmailChange}
                    />
                </div>
                <div className={styles.passwordWrapper}>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={handlePasswordChange}
                    />
                </div>
                <button type="submit">Log in</button>

                {loading && <div>Loading...</div>}
                {isAuthenticated || <div>Incorrect email or password</div>}
            </form>
        </div>
    )
}