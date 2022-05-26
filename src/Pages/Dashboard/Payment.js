import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import React, { useContext } from 'react'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import axiosPrivate from '../../api/axiosPrivate'
import { PartsIdContext } from '../../App'
import CheckoutForm from '../Dashboard/CheckoutForm'
import LoadingSpinner from '../Shared/LoadingSpinner'
import SetTitle from '../Shared/SetTitle'

const Payment = () => {
    const { id } = useParams()
    const { setPartsId } = useContext(PartsIdContext)
    setPartsId(id)

    const getOrder = async ({ queryKey }) => {
        const { data } = await axiosPrivate.get(`https://young-brushlands-57803.herokuapp.com/order/${queryKey[1]}`)
        return data
    }
    const { data, isLoading } = useQuery(['single-order', id], getOrder)

    if (isLoading) {
        return <LoadingSpinner />
    }
    const { name, partsName, quantity, amount } = data

    const stripePromise = loadStripe(
        'pk_test_51L0VcfAnKHpPDONQvKZOdQdxd6pmUAxkviJRpt94NGZyOn1jVgDBdg6aGIjrP8gw4E5oGLGTpMHhjW2Jjacaroie00lZkaxl0c'
    )

    return (
        <div>
            <SetTitle title={'Payment'} />
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

            <div class="card w-96 bg-base-100 shadow-lg mt-6">
                <div class="card-body pt-4">
                    <Elements stripe={stripePromise}>
                        <CheckoutForm order={data} />
                    </Elements>
                </div>
            </div>
        </div>
    )
}

export default Payment
