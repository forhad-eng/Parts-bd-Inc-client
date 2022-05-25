import React, { useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useQuery } from 'react-query'
import axiosPrivate from '../../api/axiosPrivate'
import auth from '../../Firebase/firebase.init'
import LoadingSpinner from '../Shared/LoadingSpinner'
import CancelModal from './CancelModal'
import MyOrderRow from './MyOrderRow'

const MyOrders = () => {
    const [user, loading] = useAuthState(auth)
    const [order, setOrder] = useState(null)

    const getOrders = async () => {
        if (user) {
            const { data } = await axiosPrivate.get(`http://localhost:5000/order/user/${user.email}`)
            return data
        }
    }

    const { data, isLoading, refetch } = useQuery('my-orders', getOrders)

    if (loading || isLoading) {
        return <LoadingSpinner />
    }

    return (
        <div class="overflow-x-auto shadow rounded-xl pb-6">
            <h2 className="text-2xl font-bold pt-4 pl-10 mb-2">My Orders</h2>
            <hr className="mb-6" />
            {data.length ? (
                <table class="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Quantity</th>
                            <th>Amount</th>
                            <th>Payment Status</th>
                            <th>Order Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data?.map((order, index) => (
                            <MyOrderRow order={order} setOrder={setOrder} index={index} />
                        ))}
                    </tbody>
                </table>
            ) : (
                <p className="text-2xl text-center text-red-600">No Data Found!</p>
            )}
            {order && <CancelModal order={order} refetch={refetch} />}
        </div>
    )
}

export default MyOrders
