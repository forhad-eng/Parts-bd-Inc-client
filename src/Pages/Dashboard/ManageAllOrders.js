import React, { useState } from 'react'
import { useQuery } from 'react-query'
import { toast } from 'react-toastify'
import axiosPrivate from '../../api/axiosPrivate'
import LoadingSpinner from '../Shared/LoadingSpinner'

const ManageAllOrders = () => {
    const [order, setOrder] = useState(null)
    const getUsers = async () => {
        const { data } = await axiosPrivate.get('https://young-brushlands-57803.herokuapp.com/order')
        return data
    }
    const { data, isLoading, refetch } = useQuery('all-orders', getUsers)

    if (isLoading) {
        return <LoadingSpinner />
    }

    const updateToShipped = async _id => {
        const { data } = await axiosPrivate.patch(`https://young-brushlands-57803.herokuapp.com/order/${_id}`)
        if (data.success) {
            refetch()
            toast.success(data.message)
        }
    }

    const cancelOrderHandle = async _id => {
        const { data } = await axiosPrivate.delete(`https://young-brushlands-57803.herokuapp.com/order/${_id}`)
        if (data.success) {
            refetch()
            toast.success(data.message)
        }
    }

    return (
        <div className="shadow rounded-xl">
            <h2 className="text-2xl font-bold pt-4 pl-10 mb-2">Manage All Orders</h2>
            <hr className="mb-6" />
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
                                        <label
                                            onClick={() => setOrder(item)}
                                            for="admin-cancel-order"
                                            class="btn btn-xs"
                                        >
                                            Cancel
                                        </label>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {order && <CancelOrder order={order} cancelOrderHandle={cancelOrderHandle} />}
        </div>
    )
}

const CancelOrder = ({ order, cancelOrderHandle }) => {
    const { partsName, _id } = order

    return (
        <div>
            <input type="checkbox" id="admin-cancel-order" class="modal-toggle" />
            <div class="modal modal-bottom sm:modal-middle">
                <div class="modal-box">
                    <label for="admin-cancel-order" class="btn btn-sm btn-circle absolute right-2 top-2">
                        ✕
                    </label>
                    <h3 class="font-bold text-lg">Are you sure?</h3>
                    <p class="py-4">
                        You want to cancel <span className="font-bold">{partsName}</span> order?
                    </p>
                    <div class="modal-action">
                        <label onClick={() => cancelOrderHandle(_id)} for="admin-cancel-order" class="btn">
                            Yes
                        </label>
                        <label for="admin-cancel-order" class="btn">
                            No
                        </label>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ManageAllOrders
