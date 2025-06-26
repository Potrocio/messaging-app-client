import { useState } from "react"
import LoginForm from "../components/forms/loginForm/LoginForm"
import styles from "./pages.module.css"

export default function LoginPage() {

    return (
        <div className={styles.loginPageWrapper}>
            <LoginForm />
        </div>
    )
}