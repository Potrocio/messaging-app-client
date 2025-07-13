import { useState } from "react"
import styles from "./loginForm.module.css"
import { useNavigate } from "react-router-dom"


export default function LoginForm() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState('')

    const navigate = useNavigate()

    function handleEmailChange(e) {
        setEmail(e.target.value)
    }

    function handlePasswordChange(e) {
        setPassword(e.target.value)
    }

    async function handleFormSubmit(e) {
        e.preventDefault()
        if (email.trim().length === 0) {
            setMessage("Email field cannot be empty")
            return
        }
        if (!email.includes("@")) {
            setMessage("Email field must include a valid email")
            return
        }
        if (password.trim().length === 0) {
            setMessage("Password field cannot be empty")
            return
        }
        // post request to verify if user exists and if user is authenticated
        try {
            setLoading(true)
            const apiUrl = import.meta.env.VITE_API_URL;
            const res = await fetch(`${apiUrl}/api/user/login`, {
                mode: "cors",
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email,
                    password
                })
            })
            if (!res.ok) {
                if (res.status === 401) {
                    setMessage("Incorrect email or password");
                } else {
                    setMessage("Something went wrong. Please try again.");
                }
                throw new Error(res.status);
            }
            const data = await res.json();
            // if user is authenticated store the token in local storage and redirect to their homepage
            if (data.token) {
                console.log("data.token", data.token)
                localStorage.setItem("token", data.token)
                setMessage('')
                navigate("/home")
            } else {
                // if user is not authenticated then set a display message on the UI
                setMessage("Incorrect email or password")
            }
        } catch (error) {
            console.log("error", error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className={styles.loginFormWrapper}>
            <h2 className={styles.loginTitle}>Account login</h2>
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
            {message && <div>{message}</div>}
        </div>
    )
}