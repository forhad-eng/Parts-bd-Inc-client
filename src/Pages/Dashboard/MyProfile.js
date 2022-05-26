import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import axiosPrivate from '../../api/axiosPrivate'
import auth from '../../Firebase/firebase.init'
import useUser from '../../hooks/useUser'
import SetTitle from '../Shared/SetTitle'

const MyProfile = () => {
    const [user] = useAuthState(auth)
    const [userDetails] = useUser(user)
    const { email, name, education, city, division, phone, linkedIn } = userDetails

    const addFieldHandle = async e => {
        e.preventDefault()
        const education = e.target.education.value
        const city = e.target.city.value
        const division = e.target.city.value
        const phone = e.target.phone.value
        const linkedIn = e.target.linkedIn.value

        const updatedField = {
            name,
            email,
            education,
            city,
            division,
            phone,
            linkedIn
        }
        console.log(updatedField)

        const { data } = await axiosPrivate.put(
            `https://young-brushlands-57803.herokuapp.com/user/update/${email}`,
            updatedField
        )
        if (data.success) {
            toast.success(data.message)
        }
    }

    return (
        <div className="shadow rounded-xl">
            <SetTitle title={'My Profile'} />
            <h2 className="text-2xl font-bold pt-4 pl-10 mb-2">My Profile</h2>
            <hr className="mb-6" />
            <div className="pl-4 pb-10 lg:pl-10">
                <form onSubmit={e => addFieldHandle(e)}>
                    <div className="flex flex-col lg:flex-row lg:gap-20 mb-2">
                        <div>
                            <label className="font-bold text-sm">Name</label>
                            <p>{name}</p>
                        </div>
                        <div>
                            <label className="font-bold text-sm mb-2 lg:mb-0">Email</label>
                            <p>{email}</p>
                        </div>
                    </div>

                    <div className="mb-2">
                        <label className="font-bold text-sm">Education</label>
                        {education ? (
                            <p>{education}</p>
                        ) : (
                            <input
                                name="education"
                                type="text"
                                placeholder="Your intuition"
                                class="input input-bordered w-full max-w-xs block"
                            />
                        )}
                    </div>
                    <div className="flex gap-9 mb-2">
                        <div>
                            <label className="font-bold text-sm">City</label>
                            {city ? (
                                <p>{city}</p>
                            ) : (
                                <input
                                    name="city"
                                    type="text"
                                    placeholder="city"
                                    class="input input-bordered w-full max-w-xs block"
                                />
                            )}
                        </div>
                        <div>
                            <label className="font-bold text-sm">Division</label>
                            {division ? (
                                <p>{division}</p>
                            ) : (
                                <input
                                    name="division"
                                    type="text"
                                    placeholder="division"
                                    class="input input-bordered w-full max-w-xs block"
                                />
                            )}
                        </div>
                    </div>
                    <div className="flex gap-4 mb-2">
                        <div>
                            <label className="font-bold text-sm">Phone</label>
                            {phone ? (
                                <p>{phone}</p>
                            ) : (
                                <input
                                    name="phone"
                                    type="text"
                                    placeholder="Phone"
                                    class="input input-bordered w-full max-w-xs block"
                                />
                            )}
                        </div>
                        <div>
                            <label className="font-bold text-sm">LinkedIn</label>
                            {linkedIn ? (
                                <p>{linkedIn}</p>
                            ) : (
                                <input
                                    name="linkedIn"
                                    type="text"
                                    placeholder="LinkedIn profile link"
                                    class="input input-bordered w-full max-w-xs block"
                                />
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
