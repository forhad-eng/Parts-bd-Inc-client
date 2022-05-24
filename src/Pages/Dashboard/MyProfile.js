import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { Link } from 'react-router-dom'
import auth from '../../Firebase/firebase.init'
import useUser from '../../hooks/useUser'

const MyProfile = () => {
    const [user] = useAuthState(auth)
    const [userDetails] = useUser(user)
    const { email, name } = userDetails

    return (
        <div className="shadow rounded-xl">
            <h2 className="text-2xl font-bold pt-4 pl-10 mb-2">My Profile</h2>
            <hr className="mb-6" />
            <div className="pl-10 pb-10">
                <div className="mb-4">
                    <label className="font-bold text-sm">Name</label>
                    <p>{name}</p>
                </div>
                <div>
                    <label className="font-bold text-sm">Email</label>
                    <p>{email}</p>
                </div>
                <Link to="user/update-profile">
                    <button className="btn btn-primary btn-sm mt-6">Update Profile</button>
                </Link>
            </div>
        </div>
    )
}

export default MyProfile
