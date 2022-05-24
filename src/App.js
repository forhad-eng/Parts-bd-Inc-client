import { Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import AddReview from './Pages/Dashboard/AddReview'
import AllUsers from './Pages/Dashboard/AllUsers'
import Dashboard from './Pages/Dashboard/Dashboard'
import MyOrders from './Pages/Dashboard/MyOrders'
import MyProfile from './Pages/Dashboard/MyProfile'
import Payment from './Pages/Dashboard/Payment'
import UpdateProfile from './Pages/Dashboard/UpdateProfile'
import BestSeller from './Pages/Home/BestSeller'
import Home from './Pages/Home/Home'
import Review from './Pages/Home/Review'
import TopRated from './Pages/Home/TopRated'
import Login from './Pages/Login/Login'
import RequireAdmin from './Pages/Login/RequireAdmin'
import RequireAuth from './Pages/Login/RequireAuth'
import SignUp from './Pages/Login/SignUp'
import Purchase from './Pages/Purchase/Purchase'
import Navbar from './Pages/Shared/Navbar'

function App() {
    return (
        <div>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />}>
                    <Route index element={<BestSeller />} />
                    <Route path="top-rated" element={<TopRated />} />
                </Route>
                <Route path="/review" element={<Review />} />
                <Route
                    path="/purchase/:id"
                    element={
                        <RequireAuth>
                            <Purchase />
                        </RequireAuth>
                    }
                />
                <Route
                    path="/dashboard"
                    element={
                        <RequireAuth>
                            <Dashboard />
                        </RequireAuth>
                    }
                >
                    <Route index element={<MyProfile />} />
                    <Route
                        path="all-users"
                        element={
                            <RequireAdmin>
                                <AllUsers />
                            </RequireAdmin>
                        }
                    />
                    <Route path="user/update-profile" element={<UpdateProfile />} />
                    <Route path="my-orders" element={<MyOrders />} />
                    <Route path="add-review" element={<AddReview />} />
                    <Route path="payment/:id" element={<Payment />} />
                </Route>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
            </Routes>
            <ToastContainer />
        </div>
    )
}

export default App
