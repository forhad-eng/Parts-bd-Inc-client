import { useEffect, useState } from 'react'
import axiosPrivate from '../api/axiosPrivate'

const useAdmin = user => {
    const [admin, setAdmin] = useState(false)
    const [adminLoading, setAdminLoading] = useState(true)

    useEffect(() => {
        const getAdmin = async () => {
            if (user) {
                const email = user.email
                const { data } = await axiosPrivate.get(`https://parts-bd-inc-server.vercel.app/admin/${email}`)
                if (data) {
                    setAdmin(data.admin)
                    setAdminLoading(false)
                }
            }
        }
        getAdmin()
    }, [user])

    return [admin, adminLoading]
}

export default useAdmin
