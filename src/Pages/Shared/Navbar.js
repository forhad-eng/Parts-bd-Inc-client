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

    if (
        p === '/' ||
        p === '/review' ||
        p === '/blogs' ||
        p === '/top-rated' ||
        p === '/my-portfolio' ||
        p === '/dashboard' ||
        p === '/dashboard/user/update-profile' ||
        p === '/dashboard/my-orders' ||
        p === '/dashboard/add-review' ||
        p === '/dashboard/all-users' ||
        p === '/dashboard/manage-orders' ||
        p === '/dashboard/manage-products' ||
        p === '/dashboard/add-product' ||
        p === '/dashboard/pending-orders' ||
        p === '/dashboard/shipped-orders' ||
        p === '/dashboard/unpaid-orders' ||
        p === `/purchase/${partsId}` ||
        p === `/dashboard/payment/${partsId}`
    ) {
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
                <Link to="/">Home</Link>
            </li>
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
                    <li>
                        <button onClick={signOutHandle}>Sign Out</button>
                    </li>
                </>
            ) : (
                <li>
                    <Link to="/login">Login</Link>
                </li>
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
                <ul className="menu menu-horizontal p-0">{menuItems}</ul>
            </div>
            {(p === '/dashboard' || p === '/dashboard/my-orders' || p === '/dashboard/add-review') && (
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
