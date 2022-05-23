import { Route, Routes } from 'react-router-dom'
import BestSeller from './Pages/Home/BestSeller'
import Home from './Pages/Home/Home'
import TopRated from './Pages/Home/TopRated'
import Login from './Pages/Login/Login'
import SignUp from './Pages/Login/SignUp'
import Navbar from './Pages/Shared/Navbar'

function App() {
    return (
        <div className="">
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />}>
                    <Route index element={<BestSeller />} />
                    <Route path="top-rated" element={<TopRated />} />
                </Route>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
            </Routes>
        </div>
    )
}

export default App
