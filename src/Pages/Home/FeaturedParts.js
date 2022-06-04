import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { useQuery } from 'react-query'
import axiosPrivate from '../../api/axiosPrivate'
import '../../Styles/Banner.css'
import LoadingSpinner from '../Shared/LoadingSpinner'
import PartsCard from './PartsCard'

const FeaturedParts = () => {
    const [page, setPage] = useState(0)
    const [size, setSize] = useState(4)

    const getParts = async ({ queryKey }) => {
        const { data } = await axiosPrivate.get(
            `https://secure-fjord-36331.herokuapp.com/parts?page=${queryKey[1]}&size=${queryKey[2]}`
        )
        return data
    }
    const { data, isLoading } = useQuery(['parts', page, size], getParts, { keepPreviousData: true })

    if (isLoading) {
        return <LoadingSpinner />
    }

    return (
        <div className="max-w-7xl mx-auto px-7 lg:px-10 mt-14 mb-10">
            <div className="flex justify-between items-center border-b-2">
                <h4 className="text-xl font-semibold">Featured Products</h4>
                <div id="featured" className="flex items-center">
                    <button onClick={() => setSize(10)} className="btn btn-secondary btn-xs">
                        All
                    </button>
                    <button
                        disabled={page === 0}
                        onClick={() => setPage(page > 0 && page - 1)}
                        className={`btn btn-link btn-xs text-white p-1 px-2 ml-1 hover:bg-primary ${
                            page === 0 ? 'bg-red-400' : 'bg-primary'
                        }`}
                    >
                        <FontAwesomeIcon icon={faChevronLeft} />
                    </button>
                    <button
                        disabled={page === 6}
                        onClick={() => setPage(page < 6 && page + 1)}
                        className={`btn btn-link btn-xs text-white p-1 px-2 ml-1 hover:bg-primary ${
                            page >= 6 ? 'bg-red-400' : 'bg-primary'
                        }`}
                    >
                        {' '}
                        <FontAwesomeIcon icon={faChevronRight} />
                    </button>
                </div>
            </div>

            <div className="grid lg:grid-cols-4 gap-10 mt-8">
                {data?.data?.map(parts => (
                    <PartsCard parts={parts} />
                ))}
            </div>
        </div>
    )
}

export default FeaturedParts
