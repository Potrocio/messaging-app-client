// React & Dom
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// Global CSS
import './index.css'

// React Router
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

// Route pages
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import HomePage from './pages/HomePage'
import SettingsPage from './pages/SettingsPage'
import AddFriendPage from './pages/AddFriendPage'
import NewMessagePage from './pages/NewMessagePage'
import MessagePreviewPage from './pages/MessagePreviewPage'


const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />
  },
  {
    path: "/login",
    element: <LoginPage />
  },
  {
    path: "/signup",
    element: <SignupPage />
  },
  {
    path: "/home",
    element: <HomePage />
  },
  {
    path: "/settings",
    element: <SettingsPage />
  },
  {
    path: "/add-friend",
    element: <AddFriendPage />
  },
  {
    path: "/new-message",
    element: <NewMessagePage />
  },
  {
    path: "/message-preview",
    element: <MessagePreviewPage />
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
