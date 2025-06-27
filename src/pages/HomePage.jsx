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

    return (
        <div className={styles.homepageWrapper}>
            <button className={styles.settings} onClick={navigateToSettings}>Settings</button>
            <HomeTabSelector tabSelected={tabSelected} setTabSelected={setTabSelected} />
            <SelectedTabData tabSelected={tabSelected} />
        </div>
    )
}