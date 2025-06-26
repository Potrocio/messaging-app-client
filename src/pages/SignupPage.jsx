import { useState } from "react"
import styles from "./pages.module.css"
import SignupForm from "../components/forms/signupForm/SignupForm"
import AccountCreatedMenu from "../components/menus/accountCreated/AccountCreatedMenu"

// I need to modularize forms into their own components, and make the pages more modular
// If accountCreated, instead of form I need to load a success message with a button to go to login

export default function SignupPage() {
    const [accountCreated, setAccountCreated] = useState(false)

    function toggleAccountCreated() {
        setAccountCreated(prev => !prev)
    }

    return (
        <div className={styles.loginPageWrapper}>
            <SignupForm toggleAccountCreated={toggleAccountCreated} />
            {accountCreated && <AccountCreatedMenu />}
        </div>
    )
}