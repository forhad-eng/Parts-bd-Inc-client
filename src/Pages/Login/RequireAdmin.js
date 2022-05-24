import { signOut } from 'firebase/auth'
import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useNavigate } from 'react-router-dom'
import auth from '../../Firebase/firebase.init'
import useAdmin from '../../hooks/useAdmin'
import LoadingSpinner from '../Shared/LoadingSpinner'

const RequireAdmin = ({ children }) => {
    const [user, loading] = useAuthState(auth)
    const [admin, adminLoading] = useAdmin(user)
    const navigate = useNavigate()

    if (loading || adminLoading) {
        return <LoadingSpinner />
    }

    if (!admin) {
        localStorage.removeItem('accessToken')
        signOut(auth)
        return navigate('/login')
    }

    return children
}

export default RequireAdmin
