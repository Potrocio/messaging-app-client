import { useState } from "react"
import styles from "./pages.module.css"
import HomeTabSelector from "../components/homeTabSelector/HomeTabSelector"
import SelectedTabData from "../components/selectedTabData/SelectedTabData"

export default function HomePage() {
    const [tabSelected, setTabSelected] = useState('Messages')

    return (
        <div className={styles.homepageWrapper}>
            <button className={styles.settings}>Settings</button>
            <HomeTabSelector setTabSelected={setTabSelected} />
            <SelectedTabData tabSelected={tabSelected} />
        </div>
    )
}