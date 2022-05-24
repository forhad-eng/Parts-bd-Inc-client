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
        <div class="overflow-x-auto">
            <table class="table w-full">
                <thead>
                    <tr>
                        <th></th>
                        <th>Name</th>
                        <th>Quantity</th>
                        <th>Amount</th>
                        <th>Payment Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {data?.map((order, index) => (
                        <MyOrderRow order={order} setOrder={setOrder} index={index} />
                    ))}
                </tbody>
            </table>
            {order && <CancelModal order={order} refetch={refetch} />}
        </div>
    )
}

export default MyOrders
