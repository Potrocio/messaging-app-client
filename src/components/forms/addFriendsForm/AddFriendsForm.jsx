import { useState } from "react"
import styles from "./addFriendsForm.module.css"
import { useNavigate } from "react-router-dom"

export default function AddFriendsForm() {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [searchResults, setSearchResults] = useState([])
    const [message, setMessage] = useState('')
    const [testData, setTestData] = useState([{
        id: 1,
        firstName: "beginning",
        lastName: "end",
        email: "beginning.end@you.com",
    }])
    const [fakeFriendsList, setFakeFriendsList] = useState([{
        id: 1,
        firstName: "beginning",
        lastName: "end",
        email: "beginning.end@you.com",
    }])
    const [fakePendingList, setFakePendingList] = useState([{
        id: 2,
        firstName: "i",
        lastName: "am",
        email: "i.am@you.com",
    }])


    const navigate = useNavigate()

    function handleFirstNameChange(e) {
        setFirstName(e.target.value)
    }

    function handleLastNameChange(e) {
        setLastName(e.target.value)
    }

    function handleFormSubmit(e) {
        e.preventDefault()
        // send get fetch request to check if name exists
        // if it exists set it to the friends Found state
        // if it does not exist leave it as it is
        if (firstName == "beginning" && lastName == "end") {
            setMessage('')
            setSearchResults(testData)
        } else {
            setMessage(["No friends found"])
            setSearchResults([])
        }
    }

    function handleCancelButtonClick() {
        navigate('/home')
    }

    function handleFriendRequest() {
        //send friend request
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
                                {/* If personFound during search is in friends list then next to the name of the person will be "friend" */}
                                {fakeFriendsList.some(friends => friends.id == personFound.id) ?
                                    (<div>Friend</div>)
                                    :
                                    // If personFound during search is in pending list then next to the name of the person will be "pending"
                                    (fakePendingList.some(pending => pending.id == personFound.id) ?
                                        (<div>Pending</div>)
                                        :
                                        // If personFound during search is not in pending list or friend list then next to the name of the person will be a "Request" button
                                        (<button onClick={handleFriendRequest}>Request</button>)
                                    )
                                }
                            </>
                        )
                    })}
                </ul>
            }
            {message && <div>{message}</div>}
        </div>
    )
}