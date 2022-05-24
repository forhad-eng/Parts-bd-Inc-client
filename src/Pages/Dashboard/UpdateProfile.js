import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import axiosPrivate from '../../api/axiosPrivate'
import auth from '../../Firebase/firebase.init'
import useUser from '../../hooks/useUser'

const UpdateProfile = () => {
    const [user] = useAuthState(auth)
    const [userDetails, setUserDetails] = useUser(user)
    const { email, name } = userDetails
    const { register, handleSubmit } = useForm()

    const onSubmit = async formData => {
        const { data } = await axiosPrivate.patch(`http://localhost:5000/user/${email}`, formData)
        if (data.success) {
            toast.success(data.message)
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="shadow rounded-xl pl-10 pb-10">
            <div className="form-control w-1/2 mt-2">
                <label className="label">
                    <span className="label-text">Name</span>
                </label>
                <input
                    {...register('name')}
                    onChange={e => setUserDetails({ name: e.target.value, email })}
                    value={name}
                    type="text"
                    className="input input-bordered"
                />
            </div>
            <div className="form-control w-1/2 mt-2">
                <label className="label">
                    <span className="label-text">Email</span>
                </label>
                <input
                    value={email}
                    readOnly
                    disabled
                    type="text"
                    placeholder="Email"
                    className="input input-bordered"
                />
            </div>
            <button className="btn btn-primary btn-sm mt-4">Update</button>
        </form>
    )
}

export default UpdateProfile
