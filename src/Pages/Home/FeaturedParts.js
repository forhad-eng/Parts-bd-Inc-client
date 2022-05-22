import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { useQuery } from 'react-query'
import axiosPrivate from '../../api/axiosPrivate'
import LoadingSpinner from '../Shared/LoadingSpinner'
import PartsCard from './PartsCard'

const FeaturedParts = () => {
    const [page, setPage] = useState(0)
    const [size, setSize] = useState(3)

    const getParts = async ({ queryKey }) => {
        const { data } = await axiosPrivate.get(`http://localhost:5000/parts?page=${queryKey[1]}&size=${queryKey[2]}`)
        return data
    }

    const { data, isLoading } = useQuery(['parts', page, size], getParts, { keepPreviousData: true })
    console.log(data)
    if (isLoading) {
        return <LoadingSpinner />
    }

    return (
        <div className="max-w-7xl mx-auto lg:px-10 mt-14 mb-10">
            <div className="flex justify-between items-center border-b-2">
                <h4 className="text-xl font-semibold">Featured Products</h4>
                <div className="flex items-center">
                    <button onClick={() => setSize(10)} className="btn btn-ghost btn-sm mr-2">
                        All
                    </button>
                    <FontAwesomeIcon
                        onClick={() => setPage(page > 0 && page - 1)}
                        icon={faChevronLeft}
                        className="bg-primary text-white p-1"
                    />
                    <FontAwesomeIcon
                        onClick={() => setPage(page < 6 && page + 1)}
                        icon={faChevronRight}
                        className={`text-white p-1 ml-1 ${page >= 6 ? 'bg-red-400' : 'bg-primary'}`}
                    />
                </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-16 mt-8">
                {data?.data?.map(parts => (
                    <PartsCard parts={parts} />
                ))}
            </div>
        </div>
    )
}

export default FeaturedParts
