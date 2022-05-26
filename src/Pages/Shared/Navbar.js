import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { signOut } from 'firebase/auth'
import React, { useContext } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { PartsIdContext } from '../../App'
import auth from '../../Firebase/firebase.init'

const Navbar = () => {
    const [user] = useAuthState(auth)
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

    const allPaths = ['/', '/review', '/blogs', '/my-portfolio', '/login', '/signup', ...dashboardPaths]

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
                <Link to="/review">Reviews</Link>
            </li>
            <li>
                <Link to="/blogs">Blogs</Link>
            </li>
            <li>
                <Link to="/my-portfolio">My Portfolio</Link>
            </li>
            {user ? (
                <>
                    <li>
                        <Link to="/dashboard">Dashboard</Link>
                    </li>

                    <span className="flex items-center ">
                        <button className="btn btn-primary btn-sm text-white font-normal" onClick={signOutHandle}>
                            Sign Out <FontAwesomeIcon className="ml-2" icon={faRightFromBracket} />
                        </button>
                    </span>
                </>
            ) : (
                <Link to="/login" className="flex items-center">
                    <button className="btn btn-primary btn-sm text-white font-normal">Login</button>
                </Link>
            )}
        </>
    )

    return (
        <div className={`navbar bg-base-100 max-w-7xl mx-auto lg:px-10 ${path ? '' : 'hidden'}`}>
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
                        className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
                    >
                        {menuItems}
                    </ul>
                </div>
                <Link to="/" className="btn btn-ghost normal-case text-xl">
                    PARTS<span className="text-primary">BD</span>&nbsp;INC
                </Link>
            </div>
            <div className="navbar-end hidden lg:flex">
                <ul className="menu menu-horizontal p-0 mr-2">{menuItems}</ul>
                {user && (
                    <div class="avatar placeholder">
                        <div class="bg-neutral-focus text-neutral-content rounded-full w-10">
                            <span className="uppercase flex items-center">
                                {user?.displayName.split(' ')[0].slice(0, 1)}
                                {user?.displayName.split(' ')[1]?.slice(0, 1)}
                            </span>
                        </div>
                    </div>
                )}
            </div>
            {dashboardPaths.includes(p) && (
                <div className="navbar-end flex lg:hidden">
                    <label for="dashboard-drawer" tabIndex="1" className="btn btn-ghost lg:hidden">
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
                </div>
            )}
        </div>
    )
}

export default Navbar
