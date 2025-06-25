import { useState } from "react"
import { useNavigate } from "react-router-dom"
import styles from "./pages.module.css"

// I need to modularize forms into their own components, and make the pages more modular
// If accountCreated, instead of form I need to load a success message with a button to go to login

export default function SignupPage() {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [accountCreated, setAccountCreated] = useState(false)

    const navigate = useNavigate()

    function handleFirstNameChange(e) {
        setFirstName(e.target.value)
    }

    function handleLastNameChange(e) {
        setLastName(e.target.value)
    }

    function handleEmailChange(e) {
        setEmail(e.target.value)
    }

    function handlePasswordChange(e) {
        setPassword(e.target.value)
    }

    function handleFormSubmit(e) {
        e.preventDefault()
        navigate("/login")
    }

    return (
        <div className={styles.loginPageWrapper}>
            <h2 className={styles.loginTitle}>Create account</h2>
            <form onSubmit={handleFormSubmit}>
                <div className={styles.firstNameWrapper}>
                    <label htmlFor="firstName">First name</label>
                    <input
                        type="firstName"
                        id="firstName"
                        name="firstName"
                        value={firstName}
                        onChange={handleFirstNameChange}
                    />
                </div>
                <div className={styles.lastNameWrapper}>
                    <label htmlFor="lastName">Last name</label>
                    <input
                        type="lastName"
                        id="lastName"
                        name="lastName"
                        value={lastName}
                        onChange={handleLastNameChange}
                    />
                </div>
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
                <button type="submit">Create</button>

                {loading && <div>Loading...</div>}
            </form>
        </div>
    )
}