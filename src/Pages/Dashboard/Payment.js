import React from 'react'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import axiosPrivate from '../../api/axiosPrivate'
import LoadingSpinner from '../Shared/LoadingSpinner'

const Payment = () => {
    const { id } = useParams()

    const getOrder = async ({ queryKey }) => {
        const { data } = await axiosPrivate.get(`http://localhost:5000/order/${queryKey[1]}`)
        return data
    }
    const { data, isLoading } = useQuery(['single-order', id], getOrder)

    if (isLoading) {
        return <LoadingSpinner />
    }
    const { _id, name, partsName, quantity, amount, paid } = data

    return (
        <div>
            <div class="card w-96 bg-base-100 shadow-lg">
                <div class="card-body pt-4">
                    <h2 class="card-title text-success">Hello, {name}</h2>
                    <p>
                        Your order: <span className="text-orange-600 font-bold">{partsName}</span>
                    </p>
                    <p>
                        Quantity: <span className="text-orange-600 font-bold">{quantity} Piece</span>
                    </p>
                    <p>
                        Amount to pay: <span className="text-orange-600 font-bold">${amount}</span>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Payment
