import React from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'

const Offers = () => {
    const { pathname } = useLocation()

    return (
        <div className="text-center my-20 max-w-7xl mx-auto lg:px-10">
            <h1 className="text-3xl font-semibold">Attention! Deal Zone </h1>
            <p className="text-gray-500">Hurry up! Discounts up to 70% </p>

            <div className="offers mt-14">
                <div className="offers-bg">
                    <h2 className="text-2xl mt-24 mb-6">Tires and Wheels</h2>
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
