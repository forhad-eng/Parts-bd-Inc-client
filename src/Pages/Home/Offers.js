import React from 'react'
import { useQuery } from 'react-query'
import { Link, Outlet, useLocation } from 'react-router-dom'
import axiosPrivate from '../../api/axiosPrivate'
import LoadingSpinner from '../Shared/LoadingSpinner'
import PartsCard from './PartsCard'

const Offers = () => {
    const { pathname } = useLocation()
    const getParts = async () => {
        const { data } = await axiosPrivate.get(`https://parts-bd-inc-server.vercel.app/parts?page=0&size=10}`)
        return data
    }
    const { data, isLoading } = useQuery(['all-parts'], getParts, { keepPreviousData: true })

    if (isLoading) {
        return <LoadingSpinner />
    }

    return (
        <div className="my-20">
            <div className="flex justify-center items-center gap-4 md:gap-10 mt-14 px-6">
                <div>
                    <hr className="border-[#363C45] w-12 md:w-20 h-[1px] ml-auto" />
                    <hr className="border-[#363C45] w-16 md:w-40 h-[1px] mt-1" />
                    <hr className="border-[#363C45] w-12 md:w-20 h-[1px] mt-1 ml-auto" />
                </div>
                <h2 className="text-2xl md:text-3xl text-center uppercase font-semibold">Attention! Deal Zone</h2>
                <div>
                    <hr className="border-[#363C45] w-12 md:w-20 h-[1px] mr-auto" />
                    <hr className="border-[#363C45] w-16 md:w-40 h-[1px] mt-1" />
                    <hr className="border-[#363C45] w-12 md:w-20 h-[1px] mt-1 mr-auto" />
                </div>
            </div>
            <p className="text-gray-400 text-center">Hurry up! Discounts up to 70% </p>
            <hr className="border-primary w-20 h-[1px] mx-auto" />
            <hr className="border-primary w-16 h-[1px] mx-auto mt-1" />
            <hr className="border-primary w-12 h-[1px] mx-auto mt-1" />
            <div className="deals grid lg:grid-cols-4 gap-6 lg:gap-7 p-7 py-12 lg:p-24 mt-10">
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
                    <div className="flex gap-5 mb-6">
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
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default Offers
