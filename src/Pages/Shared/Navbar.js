import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { signOut } from 'firebase/auth'
import React, { useContext } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { PartsIdContext } from '../../App'
import auth from '../../Firebase/firebase.init'
import useAdmin from '../../hooks/useAdmin'

const Navbar = () => {
    const [user] = useAuthState(auth)
    const [admin] = useAdmin(user)
    const navigate = useNavigate()
    const { partsId } = useContext(PartsIdContext)
    const { pathname: p } = useLocation()
    let path = false

    const dashboardPaths = [
        '/dashboard',
        '/dashboard/user/update-profile',
        '/dashboard/my-orders',
        '/dashboard/add-review',
        '/dashboard/all-users',
        '/dashboard/manage-orders',
        '/dashboard/manage-products',
        '/dashboard/add-product',
        '/dashboard/pending-orders',
        '/dashboard/shipped-orders',
        '/dashboard/unpaid-orders',
        `/purchase/${partsId}`,
        `/dashboard/payment/${partsId}`
    ]

    const allPaths = ['/', '/top-rated', '/review', '/blogs', '/my-portfolio', '/login', '/signup', ...dashboardPaths]

    if (allPaths.includes(p)) {
        path = true
    }

    const signOutHandle = () => {
        signOut(auth)
        localStorage.removeItem('accessToken')
        navigate('/')
    }

    const menuItems = (
        <>
            <li>
                <NavLink className="py-1 text-white hover:bg-info" to="/">
                    Home
                </NavLink>
            </li>
            <li>
                <NavLink className="py-1  text-white hover:bg-info" to="/review">
                    Reviews
                </NavLink>
            </li>
            <li>
                <NavLink className="py-1  text-white hover:bg-info" to="/blogs">
                    Blogs
                </NavLink>
            </li>
            {user ? (
                <>
                    <li>
                        <NavLink className="py-1 text-white hover:bg-info" to="/dashboard">
                            Dashboard
                        </NavLink>
                    </li>

                    <span className="flex items-center">
                        <button
                            className="btn btn-primary btn-sm text-white font-normal hover:btn-info hover:text-white"
                            onClick={signOutHandle}
                        >
                            Sign Out <FontAwesomeIcon className="ml-2" icon={faRightFromBracket} />
                        </button>
                    </span>
                </>
            ) : (
                <Link to="/login" className="flex items-center">
                    <button className="btn btn-primary btn-sm text-white font-normal hover:btn-info hover:text-white">
                        Login
                    </button>
                </Link>
            )}
        </>
    )

    return (
        <div className={`navbar max-w-7xl mx-auto lg:px-10 ${path ? '' : 'hidden'}`}>
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex="0" className="btn btn-ghost lg:hidden">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16"
                            />
                        </svg>
                    </label>
                    <ul
                        tabIndex="0"
                        className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-[#21252c] rounded-box w-52"
                    >
                        {menuItems}
                    </ul>
                </div>
                <Link to="/" className="btn btn-ghost normal-case text-xl ml-10 lg:ml-0">
                    PARTS<span className="text-primary">BD</span>&nbsp;INC
                </Link>
            </div>
            <div className="navbar-end">
                <ul className="menu menu-horizontal p-0 mr-2 hidden lg:flex items-center gap-3">{menuItems}</ul>
                {user && (
                    <div className="dropdown dropdown-end">
                        <label
                            tabIndex="0"
                            className="w-10 h-10 flex justify-center items-center rounded-full uppercase  cursor-pointer bg-neutral"
                        >
                            {user?.displayName.split(' ')[0].slice(0, 1)}
                            {user?.displayName.split(' ')[1]?.slice(0, 1)}
                        </label>
                        <ul
                            tabIndex="0"
                            class="dropdown-content menu menu-compact mt-3 p-2 shadow bg-[#21252c] rounded-box w-48"
                        >
                            <li>
                                <Link
                                    className={`hover:bg-info ${p === '/dashboard' && 'border-[1px] border-info'}`}
                                    to="/dashboard"
                                >
                                    My Profile
                                </Link>
                            </li>
                            {admin && (
                                <>
                                    <li>
                                        <Link
                                            className={`hover:bg-info ${
                                                p === '/dashboard/all-users' && 'border-[1px] border-info'
                                            }`}
                                            to="all-users"
                                        >
                                            All Users
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            className={`hover:bg-info ${
                                                p === '/dashboard/manage-orders' && 'border-[1px] border-info'
                                            }`}
                                            to="manage-orders"
                                        >
                                            Manage All Orders
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            className={`hover:bg-info ${
                                                p === '/dashboard/manage-products' && 'border-[1px] border-info'
                                            }`}
                                            to="manage-products"
                                        >
                                            Manage Products
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            className={`hover:bg-info ${
                                                p === '/dashboard/add-product' && 'border-[1px] border-info'
                                            }`}
                                            to="add-product"
                                        >
                                            Add Product
                                        </Link>
                                    </li>
                                </>
                            )}
                            {!admin && (
                                <>
                                    <li>
                                        <Link
                                            className={`hover:bg-info ${
                                                p === '/dashboard/my-orders' && 'border-[1px] border-info'
                                            }`}
                                            to="/dashboard/my-orders"
                                        >
                                            My Orders
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            className={`hover:bg-info ${
                                                p === '/dashboard/add-review' && 'border-[1px] border-info'
                                            }`}
                                            to="/dashboard/add-review"
                                        >
                                            Add a Review
                                        </Link>
                                    </li>
                                </>
                            )}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Navbar
