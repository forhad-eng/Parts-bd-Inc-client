import React from 'react'
import { useQuery } from 'react-query'
import ReactStars from 'react-rating-stars-component'
import axiosPrivate from '../../api/axiosPrivate'
import LoadingSpinner from '../Shared/LoadingSpinner'

const LastSixReview = () => {
    const getReviews = async () => {
        const { data } = await axiosPrivate.get('https://secure-fjord-36331.herokuapp.com/review')
        return data
    }

    const { data, isLoading } = useQuery('reviews', getReviews)

    if (isLoading) {
        return <LoadingSpinner />
    }

    const lastSixData = []
    data?.map(item => lastSixData.unshift(item))

    return (
        <div className="max-w-7xl mx-auto mb-20 px-10 lg:px-10 mt-6 md:mt-14">
            <div className="flex justify-center items-center gap-5 md:gap-10 mt-14">
                <div>
                    <hr className="border-[#363C45] w-16 md:w-20 h-[1px] ml-auto" />
                    <hr className="border-[#363C45] w-24 md:w-40 h-[1px] mt-1" />
                    <hr className="border-[#363C45] w-16 md:w-20 h-[1px] mt-1 ml-auto" />
                </div>
                <h2 className="text-2xl md:text-3xl text-center uppercase font-semibold">Customers Review</h2>
                <div>
                    <hr className="border-[#363C45] w-16 md:w-20 h-[1px] mr-auto" />
                    <hr className="border-[#363C45] w-24 md:w-40 h-[1px] mt-1" />
                    <hr className="border-[#363C45] w-16 md:w-20 h-[1px] mt-1 mr-auto" />
                </div>
            </div>
            <p className="text-center text-gray-400">What our customers say</p>
            <hr className="border-primary w-20 h-[1px] mx-auto" />
            <hr className="border-primary w-16 h-[1px] mx-auto mt-1" />
            <hr className="border-primary w-12 h-[1px] mx-auto mt-1" />
            <div className="grid lg:grid-cols-3 gap-x-10 gap-y-5 mt-8">
                {lastSixData.slice(0, 6).map((review, index) => (
                    <div className="rounded-2xl border-2 border-primary flex items-center gap-5 p-5">
                        <div class="avatar">
                            <div class="w-14 rounded-full">
                                <img src={`https://picsum.photos/200/300?random=${index}`} alt="user" />
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
    )
}

export default LastSixReview
