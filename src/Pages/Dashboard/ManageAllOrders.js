import React from 'react'
import { useQuery } from 'react-query'
import { toast } from 'react-toastify'
import axiosPrivate from '../../api/axiosPrivate'
import LoadingSpinner from '../Shared/LoadingSpinner'

const ManageAllOrders = () => {
    const getUsers = async () => {
        const { data } = await axiosPrivate.get('http://localhost:5000/order')
        return data
    }
    const { data, isLoading, refetch } = useQuery('all-orders', getUsers)

    if (isLoading) {
        return <LoadingSpinner />
    }

    const updateToShipped = async _id => {
        const { data } = await axiosPrivate.patch(`http://localhost:5000/order/${_id}`)
        if (data.success) {
            refetch()
            toast.success(data.message)
        }
    }

    const cancelOrderHandle = async _id => {
        const { data } = await axiosPrivate.delete(`http://localhost:5000/order/${_id}`)
        if (data.success) {
            refetch()
            toast.success(data.message)
        }
    }

    return (
        <div>
            <div class="overflow-x-auto">
                <table class="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>User</th>
                            <th>Product</th>
                            <th>Quantity</th>
                            <th>Payment Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) => (
                            <tr>
                                <th>{index + 1}</th>
                                <td>{item.email}</td>
                                <td>{item.partsName}</td>
                                <td>{item.quantity}</td>
                                <td>
                                    {item.status}
                                    {!item.paid && 'Unpaid'}
                                </td>
                                <td>
                                    {item.status === 'pending' && (
                                        <button
                                            onClick={() => updateToShipped(item._id)}
                                            className="btn btn-error btn-xs"
                                        >
                                            Update To Shipped
                                        </button>
                                    )}
                                    {!item.paid && (
                                        <button
                                            onClick={() => cancelOrderHandle(item._id)}
                                            className="btn btn-error btn-xs"
                                        >
                                            Cancel Order
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

export default ManageAllOrders
