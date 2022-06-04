import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { Link, Outlet, useLocation } from 'react-router-dom'
import auth from '../../Firebase/firebase.init'
import useAdmin from '../../hooks/useAdmin'
import LoadingSpinner from '../Shared/LoadingSpinner'

const Dashboard = () => {
    const { pathname } = useLocation()
    const [user, loading] = useAuthState(auth)
    const [admin, adminLoading] = useAdmin(user)

    if (loading || adminLoading) {
        return <LoadingSpinner />
    }

    return (
        <div class="drawer drawer-mobile max-w-7xl mx-auto lg:mb-20 lg:px-10 p-4">
            <input id="dashboard-drawer" type="checkbox" class="drawer-toggle" />
            <div class="drawer-content px-2 lg:px-4 py-1">
                <div className="border-2 border-primary rounded-lg">
                    <Outlet />
                </div>
            </div>
            <div class="drawer-side shadow rounded-lg border-2 border-primary text-white">
                <label for="dashboard-drawer" class="drawer-overlay"></label>
                <ul class="menu p-4 overflow-y-auto w-64">
                    <li className={`${pathname === '/dashboard' && 'border-b-2 border-primary'}`}>
                        <Link to="/dashboard">My Profile</Link>
                    </li>
                    {admin && (
                        <>
                            <li className={`${pathname === '/dashboard/all-users' && 'border-b-2 border-primary'}`}>
                                <Link to="all-users">All Users</Link>
                            </li>
                            <li className={`${pathname === '/dashboard/manage-orders' && 'border-b-2 border-primary'}`}>
                                <Link to="manage-orders">Manage All Orders</Link>
                            </li>
                            <li
                                className={`${
                                    pathname === '/dashboard/manage-productss' && 'border-b-2 border-primary'
                                }`}
                            >
                                <Link to="manage-products">Manage Products</Link>
                            </li>
                            <li className={`${pathname === '/dashboard/add-product' && 'border-b-2 border-primary'}`}>
                                <Link to="add-product">Add Product</Link>
                            </li>
                        </>
                    )}
                    {!admin && (
                        <>
                            <li className={`${pathname === '/dashboard/my-orders' && 'border-b-2 border-primary'}`}>
                                <Link to="my-orders">My Orders</Link>
                            </li>
                            <li className={`${pathname === '/dashboard/add-review' && 'border-b-2 border-primary'}`}>
                                <Link to="add-review">Add a Review</Link>
                            </li>
                        </>
                    )}
                </ul>
            </div>
        </div>
    )
}

export default Dashboard
