import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import axiosPrivate from '../../api/axiosPrivate'
import auth from '../../Firebase/firebase.init'
import useUser from '../../hooks/useUser'
import SetTitle from '../Shared/SetTitle'

const UpdateProfile = () => {
    const [user] = useAuthState(auth)
    const [userDetails, setUserDetails] = useUser(user)
    const { email, name, education, city, division, phone, linkedIn } = userDetails
    const { register, handleSubmit } = useForm()
    const navigate = useNavigate()

    const onSubmit = async formData => {
        const updatedEducation = formData.name ? formData.name : education
        const updatedCity = formData.city ? formData.city : city
        const updatedDivision = formData.division ? formData.division : division
        const updatedPhone = formData.phone ? formData.phone : phone
        const updatedLinkedIn = formData.linkedIn ? formData.linkedIn : linkedIn

        const updatedData = {
            name,
            email,
            education: updatedEducation,
            city: updatedCity,
            division: updatedDivision,
            phone: updatedPhone,
            linkedIn: updatedLinkedIn
        }

        const { data } = await axiosPrivate.put(
            `https://secure-fjord-36331.herokuapp.com/user/update/${email}`,
            updatedData
        )
        if (data.success) {
            navigate('/dashboard')
            toast.success(data.message, { toastId: 'profile-updated2' })
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="shadow rounded-xl px-6 pb-10 lg:p-0 lg:px-20 lg:pb-10">
            <SetTitle title={'Update Profile'} />
            <div className="grid lg:grid-cols-2 gap-x-10 text-black">
                <div className="form-control mt-2">
                    <label className="label">
                        <span className="label-text text-white">Name</span>
                    </label>
                    <input
                        {...register('name')}
                        value={name}
                        readOnly
                        type="text"
                        placeholder="Name"
                        className="input input-bordered bg-base-200"
                    />
                </div>
                <div className="form-control mt-2">
                    <label className="label">
                        <span className="label-text text-white">Email</span>
                    </label>
                    <input
                        {...register('email')}
                        value={email}
                        readOnly
                        type="text"
                        placeholder="Email"
                        className="input input-bordered bg-base-200"
                    />
                </div>
                <div className="form-control mt-2">
                    <label className="label">
                        <span className="label-text text-white">Education</span>
                    </label>
                    <input
                        {...register('education')}
                        value={education}
                        onChange={e => setUserDetails({ ...userDetails, education: e.target.value })}
                        type="text"
                        placeholder="Education"
                        className="input input-bordered"
                    />
                </div>
                <div className="form-control mt-2">
                    <label className="label">
                        <span className="label-text text-white">City</span>
                    </label>
                    <input
                        {...register('city')}
                        value={city}
                        onChange={e => setUserDetails({ ...userDetails, city: e.target.value })}
                        type="text"
                        placeholder="City"
                        className="input input-bordered"
                    />
                </div>
                <div className="form-control mt-2">
                    <label className="label">
                        <span className="label-text text-white">Division</span>
                    </label>
                    <input
                        {...register('division')}
                        value={division}
                        onChange={e => setUserDetails({ ...userDetails, division: e.target.value })}
                        type="text"
                        placeholder="Division"
                        className="input input-bordered"
                    />
                </div>
                <div className="form-control mt-2">
                    <label className="label">
                        <span className="label-text text-white">Phone</span>
                    </label>
                    <input
                        {...register('phone')}
                        value={phone}
                        onChange={e => setUserDetails({ ...userDetails, phone: e.target.value })}
                        type="text"
                        placeholder="Phone"
                        className="input input-bordered"
                    />
                </div>
                <div className="form-control mt-2">
                    <label className="label">
                        <span className="label-text text-white">LinkedIn</span>
                    </label>
                    <input
                        {...register('linkedIn')}
                        value={linkedIn}
                        onChange={e => setUserDetails({ ...userDetails, linkedIn: e.target.value })}
                        type="text"
                        placeholder="LinkedIn"
                        className="input input-bordered"
                    />
                </div>
            </div>
            <button className="btn btn-primary btn-sm mt-4">Update</button>
        </form>
    )
}

export default UpdateProfile
