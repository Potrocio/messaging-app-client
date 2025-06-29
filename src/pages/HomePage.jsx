import { createContext, useState } from "react"
import styles from "./pages.module.css"
import HomeTabSelector from "../components/homeTabSelector/HomeTabSelector"
import SelectedTabData from "../components/selectedTabData/SelectedTabData"
import { useNavigate } from "react-router-dom"

export default function HomePage() {
    const [tabSelected, setTabSelected] = useState('Messages')

    const navigate = useNavigate()

    function navigateToSettings() {
        navigate('/settings')
    }

    function handleLogOut() {
        navigate('/')
    }

    return (
        <div className={styles.homepageWrapper}>
            <div>
                <button className={styles.settings} onClick={navigateToSettings}>Settings</button>
                <button onClick={handleLogOut}>Log out</button>
            </div>
            <HomeTabSelector tabSelected={tabSelected} setTabSelected={setTabSelected} />
            <SelectedTabData tabSelected={tabSelected} />
        </div>
    )
}