import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import axiosPrivate from '../../api/axiosPrivate'

const CheckoutForm = ({ order }) => {
    const stripe = useStripe()
    const elements = useElements()
    const [cardErr, setCardErr] = useState('')
    const [clientSecret, setClientSecret] = useState('')
    const [transactionId, setTransactionId] = useState('')
    const { _id, name, email, partsName } = order

    useEffect(() => {
        const getClientSecret = async () => {
            const { data } = await axiosPrivate.post(
                'https://parts-bd-inc-server.vercel.app/create-payment-intent',
                order
            )
            setClientSecret(data.clientSecret)
        }
        getClientSecret()
    }, [])

    const handleSubmit = async event => {
        event.preventDefault()

        if (!stripe || !elements) {
            return
        }

        const card = elements.getElement(CardElement)
        if (card == null) {
            return
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })

        setCardErr(error?.message || '')

        const { paymentIntent, error: intentErr } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    name
                }
            }
        })

        if (intentErr) {
            setCardErr(intentErr?.message)
        } else {
            const payment = {
                user: name,
                email,
                partsName,
                transactionId: paymentIntent.id
            }

            const { data } = await axiosPrivate.put(`https://parts-bd-inc-server.vercel.app/order/${_id}`, payment)
            if (data.success) {
                toast.success('Your payment is confirmed', { toastId: 'payment-confirm' })
                setTransactionId(paymentIntent.id)
            }
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4'
                            }
                        },
                        invalid: {
                            color: '#9e2146'
                        }
                    }
                }}
            />
            <button
                className="btn btn-sm btn-primary mt-4"
                type="submit"
                disabled={!stripe || !clientSecret || transactionId}
            >
                Pay
            </button>
            {cardErr && <p className="text-primary">{cardErr}</p>}
            {transactionId && (
                <div>
                    <p className="text-success mt-2">Congrats! Your payment is confirmed</p>
                    <p className="text-success">
                        Transaction Id: <span className="text-orange-600 font-bold">{transactionId}</span>
                    </p>
                </div>
            )}
        </form>
    )
}

export default CheckoutForm
