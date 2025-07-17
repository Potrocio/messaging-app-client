import { useState } from "react"
import styles from "./addFriendsForm.module.css"
import { useNavigate } from "react-router-dom"

export default function AddFriendsForm() {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [searchResults, setSearchResults] = useState([])
    const [message, setMessage] = useState('')

    const navigate = useNavigate()
    const apiUrl = import.meta.env.VITE_API_URL;


    function handleFirstNameChange(e) {
        setFirstName(e.target.value)
    }

    function handleLastNameChange(e) {
        setLastName(e.target.value)
    }

    async function handleFormSubmit(e) {
        e.preventDefault()
        // send get fetch request to check if name exists
        // if it exists set it to the friends Found state
        // if it does not exist leave it as it is
        try {
            const token = localStorage.getItem("token")
            if (token) {
                const res = await fetch(`${apiUrl}/api/users?firstName=${firstName}&lastName=${lastName}`, {
                    mode: "cors",
                    method: "GET",
                    headers: { "Authorization": `Bearer ${token}` }
                })
                if (!res.ok) {
                    if (res.status == 404) {
                        setMessage("Users not found")
                    } else {
                        throw new Error(res.status)
                    }
                }
                const data = await res.json()
                if (data.unknownUsers) {
                    setMessage('')
                    setSearchResults(data.unknownUsers)
                    navigate('/home')
                } else if (searchResults.length === 0) setMessage("Already friends or pending")
            } else {
                navigate('/login')
            }
        } catch (error) {
            console.log("Error", error)
        }
    }

    function handleCancelButtonClick() {
        navigate('/home')
    }

    async function handleFriendRequest(friendId) {
        //send friend request
        try {
            const token = localStorage.getItem("token")
            if (token) {
                const res = await fetch(`${apiUrl}/api/friends`, {
                    mode: "cors",
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        friendId
                    })
                })
                if (!res.ok && res.status !== 409) throw new Error(res.status)
                const data = res.json();
                if (data.message && res.status === 201) {
                    setMessage(data.message)
                }
            } else {
                navigate("/login")
            }
        } catch (error) {
            console.log("Error", error)
        }
    }

    return (
        <div className={styles.contentWrapper}>
            <h1>Search for friend</h1>
            <form onSubmit={handleFormSubmit}>
                <div>
                    <label htmlFor="firstName">First name</label>
                    <input
                        type="text"
                        name="firstName"
                        id="firstName"
                        value={firstName}
                        onChange={handleFirstNameChange}
                    />
                </div>
                <div>
                    <label htmlFor="lastName">Last name</label>
                    <input
                        type="text"
                        name="lastName"
                        id="lastName"
                        value={lastName}
                        onChange={handleLastNameChange}
                    />
                </div>
                <div>
                    <button type="submit">Search</button>
                    <button onClick={handleCancelButtonClick}>Cancel</button>
                </div>
            </form>
            {searchResults.length > 0 &&
                <ul>
                    {searchResults.map(personFound => {
                        return (
                            <>
                                <li key={personFound.id}>{personFound.firstName + ' ' + personFound.lastName}</li>
                                {/* Only people that are not yet friends or pending friends will appear in this list */}
                                (<button onClick={() => handleFriendRequest(personFound.id)}>Request</button>)
                            </>
                        )
                    })}
                </ul>
            }
            {message && <div>{message}</div>}
        </div>
    )
}