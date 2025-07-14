import { useEffect, useState } from "react"
import styles from "./pages.module.css"
import { useNavigate } from "react-router-dom"

export default function SettingsPage() {
    const [email, setEmail] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [submitMessage, setSubmitMessage] = useState('')
    const [passwordsMatchMessage, setPasswordsMatchMessage] = useState('')
    const [editEmail, setEditEmail] = useState(false)
    const [editFirstName, setEditFirstName] = useState(false)
    const [editLastName, setEditLastName] = useState(false)
    const [editPassword, setEditPassword] = useState(false)
    const [loading, setLoading] = useState(true)


    const navigate = useNavigate()

    useEffect(() => {
        async function fetchSettings() {
            try {
                const token = localStorage.getItem("token")
                if (token) {
                    const apiUrl = import.meta.env.VITE_API_URL;
                    const res = await fetch(`${apiUrl}/api/user/settings`, {
                        mode: "cors",
                        method: "GET",
                        headers: {
                            "Authorization": `Bearer ${token}`
                        }
                    })
                    if (!res.ok) throw new Error(res.status)
                    const data = await res.json()
                    console.log(data.user)
                    if (data.user) {
                        setFirstName(data.user.firstName)
                        setLastName(data.user.lastName)
                        setEmail(data.user.email)
                    }
                } else {
                    navigate('/login')
                }
            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false)
            }
        }
        fetchSettings()
    }, [])

    function handleEmailChange(e) {
        setEmail(e.target.value)
    }

    function handleFirstNameChange(e) {
        setFirstName(e.target.value)
    }

    function handleLastNameChange(e) {
        setLastName(e.target.value)
    }

    function handlePasswordChange(e) {
        setPassword(e.target.value)
    }

    function handleConfirmPasswordChange(e) {
        setConfirmPassword(e.target.value)
    }

    function emailEditMode() {
        setEditEmail(true)
        setSubmitMessage('')
    }

    function firstNameEditMode() {
        setEditFirstName(true)
        setSubmitMessage('')
    }

    function lastNameEditMode() {
        setEditLastName(true)
        setSubmitMessage('')
    }

    function passwordEditMode() {
        setEditPassword(true)
        setSubmitMessage('')
    }

    function handleSubmit() {
        if (password === confirmPassword) {
            setSubmitMessage("Changes saved")
            setEditEmail(false)
            setEditFirstName(false)
            setEditLastName(false)
            setEditPassword(false)
        } else {
            setPasswordsMatchMessage("Passwords must match")
        }
    }

    function cancelSettings() {
        navigate("/home")
    }

    return (
        <>

            {loading && <div>Loading</div>}
            {!loading &&
                <div className={styles.pageWrapper}>
                    <button className={styles.settingsHomeButton} onClick={cancelSettings}>Back to home</button>
                    <div>
                        {editEmail ?
                            (<>
                                <label htmlFor="email">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={email}
                                    onChange={handleEmailChange}
                                />
                            </>)
                            :
                            (<div>{email}</div>)
                        }
                        {editEmail || <button className={styles.editButton} onClick={emailEditMode}>Edit</button>}
                    </div>
                    <div>
                        {editFirstName ?
                            (<>
                                <label htmlFor="firstName">First name</label>
                                <input
                                    type="text"
                                    id="firstName"
                                    name="firstName"
                                    value={firstName}
                                    onChange={handleFirstNameChange}
                                />
                            </>)
                            :
                            (<div>{firstName}</div>)
                        }
                        {editFirstName || <button className={styles.editButton} onClick={firstNameEditMode}>Edit</button>}
                    </div>
                    <div>
                        {editLastName ?
                            (<>
                                <label htmlFor="lastName">Last name</label>
                                <input
                                    type="text"
                                    id="lastName"
                                    name="lastName"
                                    value={lastName}
                                    onChange={handleLastNameChange}
                                />
                            </>)
                            :
                            (<div>{lastName}</div>)
                        }
                        {editLastName || <button className={styles.editButton} onClick={lastNameEditMode}>Edit</button>}
                    </div>
                    <div>
                        {editPassword &&
                            <div className={styles.settingsPasswordWrapper}>
                                <label htmlFor="password">Password</label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    value={password}
                                    onChange={handlePasswordChange}
                                />

                                <label htmlFor="confirmPassword">Confirm password</label>
                                <input
                                    type="password"
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    value={confirmPassword}
                                    onChange={handleConfirmPasswordChange}
                                />
                                {passwordsMatchMessage && <div>{passwordsMatchMessage}</div>}
                            </div>
                        }
                        {editPassword || <button className={styles.editButton} onClick={passwordEditMode}>Change password</button>}
                    </div>
                    {submitMessage && <div>{submitMessage}</div>}
                    <div className={styles.settingsActionWrapper}>
                        <button className={styles.saveButton} onClick={handleSubmit}>Save changes</button>
                        <button className={styles.cancelButton} onClick={cancelSettings}>Cancel changes</button>
                    </div>
                </div>
            }
        </>
    )
}