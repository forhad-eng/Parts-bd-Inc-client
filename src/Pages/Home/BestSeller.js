import React from 'react'
import { useQuery } from 'react-query'
import axiosPrivate from '../../api/axiosPrivate'
import PartsCard from '../Home/PartsCard'
import LoadingSpinner from '../Shared/LoadingSpinner'

const BestSeller = () => {
    const getParts = async () => {
        const { data } = await axiosPrivate.get(`https://secure-fjord-36331.herokuapp.com/parts?page=0&size=10}`)
        return data
    }
    const { data, isLoading } = useQuery(['three-parts'], getParts, { keepPreviousData: true })

    if (isLoading) {
        return <LoadingSpinner />
    }

    return (
        <div className="grid lg:grid-cols-3 gap-7">
            {data?.data?.slice(3, 6).map(item => (
                <PartsCard parts={item} />
            ))}
        </div>
    )
}

export default BestSeller
