import React from 'react'
import { useQuery } from 'react-query'
import { toast } from 'react-toastify'
import axiosPrivate from '../../api/axiosPrivate'
import LoadingSpinner from '../Shared/LoadingSpinner'
import SetTitle from '../Shared/SetTitle'

const AllUsers = () => {
    const getUsers = async () => {
        const { data } = await axiosPrivate.get('https://secure-fjord-36331.herokuapp.com/user')
        return data
    }
    const { data, isLoading, refetch } = useQuery('all-users', getUsers)

    if (isLoading) {
        return <LoadingSpinner />
    }

    const makeAdminHandle = async email => {
        const { data } = await axiosPrivate.patch(`https://secure-fjord-36331.herokuapp.com/user/admin/${email}`)
        if (data.success) {
            refetch()
            toast.success(data.message)
        }
    }

    const removeUserHandle = async email => {
        const { data } = await axiosPrivate.delete(`https://secure-fjord-36331.herokuapp.com/user/${email}`)
        if (data.success) {
            refetch()
            toast.success(data.message)
        }
    }

    return (
        <div className="shadow rounded-xl">
            <SetTitle title={'All Users'} />
            <h2 className="text-2xl font-bold pt-4 pl-10 mb-2">All Users</h2>
            <hr className="border-primary h-[1px] mb-6" />
            <div class="overflow-x-auto">
                <table class="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((user, index) => (
                            <tr>
                                <th>{index + 1}</th>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>
                                    {user.role === 'admin' ? (
                                        <p className="text-sm">ADMIN</p>
                                    ) : (
                                        <button
                                            onClick={() => makeAdminHandle(user.email)}
                                            className="btn btn-success btn-xs"
                                        >
                                            Make Admin
                                        </button>
                                    )}
                                </td>
                                <td>
                                    {user.role !== 'admin' && (
                                        <button
                                            onClick={() => removeUserHandle(user.email)}
                                            className="btn btn-error btn-xs"
                                        >
                                            Remove User
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default AllUsers
