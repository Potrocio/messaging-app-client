import { useState } from "react"
import styles from "./loginForm.module.css"
import { useNavigate } from "react-router-dom"

// I must modularize my code more, I will create a form component

export default function LoginForm() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [accessDenied, setAccessDenied] = useState(false)

    const navigate = useNavigate()

    function toggleAccessDenied() {
        setAccessDenied(prev => !prev)
    }

    function handleEmailChange(e) {
        setEmail(e.target.value)
    }

    function handlePasswordChange(e) {
        setPassword(e.target.value)
    }

    function handleFormSubmit(e) {
        e.preventDefault()
        // toggleAccessDenied should execute when authentication fails
        toggleAccessDenied()
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
            </form>
            {accessDenied && <div>Incorrect email or password</div>}
        </div>
    )
}