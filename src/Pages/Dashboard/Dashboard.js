import React from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'

const Dashboard = () => {
    const { pathname } = useLocation()

    return (
        <div class="drawer drawer-mobile max-w-7xl mx-auto lg:px-10">
            <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
            <div class="drawer-content p-4">
                <Outlet />
                <label for="my-drawer-2" class="btn btn-primary drawer-button lg:hidden">
                    Open drawer
                </label>
            </div>
            <div class="drawer-side shadow rounded-lg mt-4">
                <label for="my-drawer-2" class="drawer-overlay"></label>
                <ul class="menu p-4 overflow-y-auto w-80 bg-base-100 text-base-content">
                    <li>
                        <Link to="/dashboard" className={`${pathname === '/dashboard' && 'bg-primary text-white'}`}>
                            My Profile
                        </Link>
                    </li>
                    <li>
                        <Link to="my-orders">My Orders</Link>
                    </li>
                    <li>
                        <Link to="add-review">Add a Review</Link>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Dashboard
