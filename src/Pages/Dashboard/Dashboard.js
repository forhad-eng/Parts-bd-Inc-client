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
                <Outlet />
            </div>
            <div class="drawer-side shadow rounded-lg">
                <label for="dashboard-drawer" class="drawer-overlay"></label>
                <ul class="menu p-4 overflow-y-auto w-64 bg-base-100 text-base-content">
                    <li>
                        <Link to="/dashboard" className={`${pathname === '/dashboard' && 'bg-primary text-white'}`}>
                            My Profile
                        </Link>
                    </li>
                    {admin && (
                        <>
                            <li>
                                <Link to="all-users">All Users</Link>
                            </li>
                            <li>
                                <Link to="manage-orders">Manage All Orders</Link>
                            </li>
                            <li>
                                <Link to="manage-products">Manage Products</Link>
                            </li>
                            <li>
                                <Link to="add-product">Add Product</Link>
                            </li>
                        </>
                    )}
                    {!admin && (
                        <>
                            <li>
                                <Link to="my-orders">My Orders</Link>
                            </li>
                            <li>
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
