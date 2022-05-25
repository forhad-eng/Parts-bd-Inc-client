import React from 'react'
import { useQuery } from 'react-query'
import { Link, Outlet, useLocation } from 'react-router-dom'
import axiosPrivate from '../../api/axiosPrivate'
import LoadingSpinner from '../Shared/LoadingSpinner'
import PartsCard from './PartsCard'

const Offers = () => {
    const { pathname } = useLocation()
    const getParts = async () => {
        const { data } = await axiosPrivate.get(`https://young-brushlands-57803.herokuapp.com/parts?page=0&size=10}`)
        return data
    }
    const { data, isLoading } = useQuery(['all-parts'], getParts, { keepPreviousData: true })

    if (isLoading) {
        return <LoadingSpinner />
    }

    return (
        <div className="my-20">
            <h1 className="text-3xl font-semibold text-center">Attention! Deal Zone </h1>
            <p className="text-gray-500 text-center">Hurry up! Discounts up to 70% </p>

            <div className="deals grid lg:grid-cols-4 gap-6 lg:gap-10 p-7 py-12 lg:p-24 mt-10">
                {data?.data?.slice(4, 8).map(item => (
                    <PartsCard parts={item} />
                ))}
            </div>

            <div className="offers max-w-7xl mx-auto lg:px-10 mt-20">
                <div className="offers-bg">
                    <h2 className="text-2xl mt-24">Tires and Wheels</h2>
                    <h2 className="text-2xl mb-6">Accessories</h2>
                    <p>Brake Kits</p>
                    <p>Sensors</p>
                    <p>Tire Chains</p>
                    <p>Tires</p>
                    <p>Wheel Covers</p>
                    <p>Wheel Disks</p>
                </div>

                <div>
                    <div className="flex gap-5">
                        <p className={`text-md font-semibold ${pathname === '/' && 'border-b-2 border-b-primary'}`}>
                            <Link to="/">Best Sellers</Link>
                        </p>
                        <p
                            className={`text-md font-semibold ${
                                pathname === '/top-rated' && 'border-b-2 border-b-primary'
                            }`}
                        >
                            <Link to="top-rated">Top Rated</Link>
                        </p>
                    </div>
                    <hr className="mb-6" />
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default Offers
