import React, { useState } from 'react'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import axiosPrivate from '../../api/axiosPrivate'
import LoadingSpinner from '../Shared/LoadingSpinner'

const AllPendingShippedUnpaidOrders = ({ searchText }) => {
    const [order, setOrder] = useState(null)
    const getOrders = async () => {
        const { data } = await axiosPrivate.get('https://parts-bd-inc-server.vercel.app/order')
        return data
    }
    const { data, isLoading, refetch } = useQuery('all-orders', getOrders)

    if (isLoading) {
        return <LoadingSpinner />
    }

    let pendingOrShippedOrders = []
    if (searchText === 'pending' || searchText === 'shipped') {
        pendingOrShippedOrders = data.filter(order => order.status === searchText)
    } else {
        pendingOrShippedOrders = data.filter(order => order.paid === false)
    }

    const updateToShipped = async _id => {
        const { data } = await axiosPrivate.patch(`https://parts-bd-inc-server.vercel.app/order/${_id}`)
        if (data.success) {
            refetch()
            toast.success(data.message)
        }
    }

    const cancelOrderHandle = async _id => {
        const { data } = await axiosPrivate.delete(`https://parts-bd-inc-server.vercel.app/order/${_id}`)
        if (data.success) {
            refetch()
            toast.success(data.message)
        }
    }

    return (
        <div className="shadow rounded-xl">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold pt-4 pl-10 mb-2">
                    <span className="uppercase">{searchText}</span> Orders
                </h2>
                <div className="flex gap-3">
                    <Link to="/dashboard/pending-orders">
                        <button className="btn btn-primary btn-xs">Pending</button>
                    </Link>
                    <Link to="/dashboard/shipped-orders">
                        <button className="btn btn-primary btn-xs">Shipped</button>
                    </Link>
                    <Link to="/dashboard/unpaid-orders">
                        <button className="btn btn-primary btn-xs mr-2">Unpaid</button>
                    </Link>
                </div>
            </div>
            <hr className="mb-6" />
            {pendingOrShippedOrders.length !== 0 ? (
                <div class="overflow-x-auto">
                    <table class="table w-full">
                        <thead>
                            <tr>
                                <th></th>
                                <th>User</th>
                                <th>Product</th>
                                <th>Quantity</th>
                                <th>Order Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pendingOrShippedOrders.map((item, index) => (
                                <tr key={item._id}>
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
            ) : (
                <p className="text-primary text-3xl text-center pb-20 p-5">No {searchText} orders found!</p>
            )}
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

export default AllPendingShippedUnpaidOrders
