import React from 'react'
import { useQuery } from 'react-query'
import ReactStars from 'react-rating-stars-component'
import axiosPrivate from '../../api/axiosPrivate'
import LoadingSpinner from '../Shared/LoadingSpinner'

const LastSixReview = () => {
    const getReviews = async () => {
        const { data } = await axiosPrivate.get('https://young-brushlands-57803.herokuapp.com/review')
        return data
    }

    const { data, isLoading } = useQuery('reviews', getReviews)

    if (isLoading) {
        return <LoadingSpinner />
    }

    const lastSixData = []
    data?.map(item => lastSixData.unshift(item))

    return (
        <div>
            <div className="max-w-7xl mx-auto mb-20 px-6 lg:px-10 mt-6">
                <h2 className="text-3xl text-center font-semibold">Customers Review</h2>
                <p className="text-center text-gray-400">What our customers say</p>
                <div className="grid lg:grid-cols-3 gap-x-10 gap-y-5 mt-8">
                    {lastSixData.slice(0, 6).map(review => (
                        <div className="shadow rounded-lg flex items-center gap-5 p-5">
                            <div class="avatar">
                                <div class="w-14 rounded-full">
                                    <img src="https://api.lorem.space/image/face?hash=92310" alt="user" />
                                </div>
                            </div>
                            <div>
                                <p>{review.description}</p>
                                <p>
                                    <ReactStars count={review.rating} size={24} color="#ffd700" />
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default LastSixReview
