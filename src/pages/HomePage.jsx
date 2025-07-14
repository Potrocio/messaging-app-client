import { createContext, useEffect, useState } from "react"
import styles from "./pages.module.css"
import HomeTabSelector from "../components/homeTabSelector/HomeTabSelector"
import SelectedTabData from "../components/selectedTabData/SelectedTabData"
import { useNavigate } from "react-router-dom"

export default function HomePage() {
    const [tabSelected, setTabSelected] = useState('Messages')
    const [conversationsPreview, setConversationsPreview] = useState([])
    const [friends, setFriends] = useState([])


    const myContext = createContext()
    const navigate = useNavigate()

    function navigateToSettings() {
        navigate('/settings')
    }

    function handleLogOut() {
        // Eventually this will log out the person
        navigate('/')
        localStorage.removeItem("token")
    }

    useEffect(() => {
        async function fetchDashboard() {
            try {
                const token = localStorage.getItem("token")
                if (token) {
                    const apiUrl = import.meta.env.VITE_API_URL;
                    const res = await fetch(`${apiUrl}/api/user/dashboard`, {
                        mode: "cors",
                        method: "GET",
                        headers: { "Authorization": `Bearer ${token}` }
                    })
                    if (!res.ok) throw new Error(res.status)
                    const data = await res.json()

                    setConversationsPreview(data.conversationsPreview)
                    setFriends(data.friends)
                } else {
                    navigate('/login')
                }
            } catch (error) {
                console.log("Error", error)
            }
        }
        fetchDashboard()

    }, [tabSelected])

    // Add tabselected and settabselected ot the context as well
    return (
        <myContext.Provider value={{ conversationsPreview, friends }}>
            <div className={styles.homepageWrapper}>
                <div>
                    <button className={styles.settings} onClick={navigateToSettings}>Settings</button>
                    <button onClick={handleLogOut}>Log out</button>
                </div>
                <HomeTabSelector tabSelected={tabSelected} setTabSelected={setTabSelected} />
                <SelectedTabData tabSelected={tabSelected} />
            </div>
        </myContext.Provider>
    )
}