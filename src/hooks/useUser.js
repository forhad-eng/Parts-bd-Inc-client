import { useEffect, useState } from 'react'
import axiosPrivate from '../api/axiosPrivate'

const useUser = user => {
    const [userDetails, setUserDetails] = useState({})

    useEffect(() => {
        const getUser = async () => {
            if (user) {
                const email = user.email
                const { data } = await axiosPrivate.get(`https://parts-bd-inc-server.vercel.app/user/${email}`)
                setUserDetails(data.user)
            }
        }
        getUser()
    }, [user])

    return [userDetails, setUserDetails]
}
export default useUser
