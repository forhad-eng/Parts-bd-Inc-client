import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import axiosPrivate from '../../api/axiosPrivate'
import auth from '../../Firebase/firebase.init'
import useUser from '../../hooks/useUser'
import LoadingSpinner from '../Shared/LoadingSpinner'
import SetTitle from '../Shared/SetTitle'

const MyProfile = () => {
    const [user, loading] = useAuthState(auth)
    const [userDetails] = useUser(user)
    const { email, name, education, city, division, phone, linkedIn } = userDetails
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm()
    const navigate = useNavigate()

    const onSubmit = async formData => {
        const updatedField = {
            name,
            email,
            ...formData
        }

        const { data } = await axiosPrivate.put(
            `https://secure-fjord-36331.herokuapp.com/user/update/${email}`,
            updatedField
        )
        if (data.success) {
            reset()
            navigate('/dashboard')
            toast.success(data.message, { toastId: 'profile-updated1' })
        }
    }

    if (loading) {
        return <LoadingSpinner />
    }

    return (
        <div className="shadow rounded-xl">
            <SetTitle title={'My Profile'} />
            <h2 className="text-2xl font-bold pt-4 pl-10 mb-2">My Profile</h2>
            <hr className="border-[#21252c] h-[1px] mb-6" />
            <div className="pl-4 pb-10 lg:pl-10">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-col lg:flex-row lg:gap-20 mb-2">
                        <div className="flex gap-x-2 items-center lg:flex-col lg:items-start">
                            <label className="font-bold text-sm">Name:</label>
                            <p>{user?.displayName}</p>
                        </div>
                        <div className="flex gap-x-2 items-center lg:flex-col lg:items-start">
                            <label className="font-bold text-sm">Email:</label>
                            <p>{email}</p>
                        </div>
                    </div>

                    <div className="mb-2">
                        <label className="font-bold text-sm">Education</label>
                        {education ? (
                            <p>{education}</p>
                        ) : (
                            <input
                                {...register('education', {
                                    required: { value: true, message: 'Education is required' }
                                })}
                                name="education"
                                type="text"
                                placeholder="Your intuition"
                                class="input input-bordered w-full max-w-xs block"
                            />
                        )}
                        {errors?.education?.type === 'required' && (
                            <p className="text-primary">{errors.education.message}</p>
                        )}
                    </div>
                    <div className="flex flex-col lg:flex-row gap-x-9 gap-y-2 mb-2">
                        <div>
                            <label className="font-bold text-sm">City</label>
                            {city ? (
                                <p>{city}</p>
                            ) : (
                                <input
                                    {...register('city', { required: { value: true, message: 'City is required' } })}
                                    name="city"
                                    type="text"
                                    placeholder="city"
                                    class="input input-bordered w-full max-w-xs block"
                                />
                            )}
                            {errors?.city?.type === 'required' && <p className="text-primary">{errors.city.message}</p>}
                        </div>
                        <div>
                            <label className="font-bold text-sm">Division</label>
                            {division ? (
                                <p>{division}</p>
                            ) : (
                                <input
                                    {...register('division', {
                                        required: { value: true, message: 'Division is required' }
                                    })}
                                    name="division"
                                    type="text"
                                    placeholder="division"
                                    class="input input-bordered w-full max-w-xs block"
                                />
                            )}
                            {errors?.division?.type === 'required' && (
                                <p className="text-primary">{errors.division.message}</p>
                            )}
                        </div>
                    </div>
                    <div className="flex flex-col lg:flex-row gap-x-9 gap-y-2 mb-2">
                        <div>
                            <label className="font-bold text-sm">Phone</label>
                            {phone ? (
                                <p>{phone}</p>
                            ) : (
                                <input
                                    {...register('phone', { required: { value: true, message: 'Phone is required' } })}
                                    name="phone"
                                    type="text"
                                    placeholder="Phone"
                                    class="input input-bordered w-full max-w-xs block"
                                />
                            )}
                            {errors?.phone?.type === 'required' && (
                                <p className="text-primary">{errors.phone.message}</p>
                            )}
                        </div>
                        <div>
                            <label className="font-bold text-sm">LinkedIn</label>
                            {linkedIn ? (
                                <p>{linkedIn}</p>
                            ) : (
                                <input
                                    {...register('linkedIn', {
                                        required: { value: true, message: 'LinkedIn is required' }
                                    })}
                                    name="linkedIn"
                                    type="text"
                                    placeholder="LinkedIn profile link"
                                    class="input input-bordered w-full max-w-xs block"
                                />
                            )}
                            {errors?.linkedIn?.type === 'required' && (
                                <p className="text-primary">{errors.linkedIn.message}</p>
                            )}
                        </div>
                    </div>
                    {!education && !city && !division && !phone && !linkedIn && (
                        <button className="btn btn-primary btn-sm mt-6">Add Fields</button>
                    )}
                </form>
                <Link to="user/update-profile">
                    <button className="btn btn-primary btn-sm mt-6">Update Profile</button>
                </Link>
            </div>
        </div>
    )
}

export default MyProfile
