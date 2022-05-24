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
    const { email, name, education, city, division, phone, linkedIn } = userDetails
    const { register, handleSubmit } = useForm()

    const onSubmit = async formData => {
        const updatedUser = {
            ...formData,
            email
        }
        const { data } = await axiosPrivate.put(`http://localhost:5000/user/update/${email}`, updatedUser)
        if (data.success) {
            toast.success(data.message)
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="shadow rounded-xl px-20 pb-10">
            <div className="grid grid-cols-2 gap-x-10">
                <div className="form-control mt-2">
                    <label className="label">
                        <span className="label-text">Name</span>
                    </label>
                    <input {...register('name')} type="text" className="input input-bordered" />
                </div>
                <div className="form-control mt-2">
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input
                        {...register('email')}
                        value={email}
                        readOnly
                        type="text"
                        placeholder="Email"
                        className="input input-bordered"
                    />
                </div>
                <div className="form-control mt-2">
                    <label className="label">
                        <span className="label-text">Education</span>
                    </label>
                    <input
                        {...register('education')}
                        type="text"
                        placeholder="Email"
                        className="input input-bordered"
                    />
                </div>
                <div className="form-control mt-2">
                    <label className="label">
                        <span className="label-text">City</span>
                    </label>
                    <input {...register('city')} type="text" placeholder="Email" className="input input-bordered" />
                </div>
                <div className="form-control mt-2">
                    <label className="label">
                        <span className="label-text">Division</span>
                    </label>
                    <input {...register('division')} type="text" placeholder="Email" className="input input-bordered" />
                </div>
                <div className="form-control mt-2">
                    <label className="label">
                        <span className="label-text">Phone</span>
                    </label>
                    <input {...register('phone')} type="text" placeholder="Email" className="input input-bordered" />
                </div>
                <div className="form-control mt-2">
                    <label className="label">
                        <span className="label-text">LinkedIn</span>
                    </label>
                    <input {...register('linkedIn')} type="text" placeholder="Email" className="input input-bordered" />
                </div>
            </div>
            <button className="btn btn-primary btn-sm mt-4">Update</button>
        </form>
    )
}

export default UpdateProfile
