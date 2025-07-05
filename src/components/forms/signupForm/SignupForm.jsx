import { useState } from "react"
import styles from "./signupForm.module.css"

// I need to modularize forms into their own components, and make the pages more modular
// If accountCreated, instead of form I need to load a success message with a button to go to login

export default function SignupForm({ toggleAccountCreated }) {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState('')


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

    async function handleFormSubmit(e) {
        e.preventDefault()
        if (firstName.length < 3 || firstName.trim().length < 3) return setMessage("first name too short")
        if (lastName.length < 3 || lastName.trim().length < 3) return setMessage("last name too short")
        if (!email.includes('@') || email.length < 5) return setMessage("Invalid email type")
        if (password === '' || password.trim().length < 3) return setMessage("Password too short")

        try {
            const apiUrl = import.meta.env.VITE_API_URL;
            console.log(apiUrl)
            const res = await fetch(`${apiUrl}/api/user/signup`, {
                mode: "cors",
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    firstName: firstName.trim(),
                    lastName: lastName.trim(),
                    email: email.trim(),
                    password
                })
            })
            const data = await res.json();

            if (!res.ok) return setMessage(data.message || "Signup failed")
            toggleAccountCreated()
        } catch (error) {
            console.log("Error", error)
        }
    }

    return (
        <div className={styles.signupFormWrapper}>
            <h2 className={styles.loginTitle}>Create account</h2>
            <form onSubmit={handleFormSubmit}>
                <div className={styles.firstNameWrapper}>
                    <label htmlFor="firstName">First name</label>
                    <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={firstName}
                        onChange={handleFirstNameChange}
                    />
                </div>
                <div className={styles.lastNameWrapper}>
                    <label htmlFor="lastName">Last name</label>
                    <input
                        type="text"
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
                {message && <div>{message}</div>}
            </form>
        </div>
    )
}