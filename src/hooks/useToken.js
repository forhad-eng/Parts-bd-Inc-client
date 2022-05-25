import axios from 'axios'
import { useEffect, useState } from 'react'

const useToken = user => {
    const [token, setToken] = useState('')

    useEffect(() => {
        const getToken = async () => {
            if (user) {
                const { email, displayName } = user?.user
                const { data } = await axios.put(`https://young-brushlands-57803.herokuapp.com/user/${email}`, {
                    email,
                    name: displayName
                })
                setToken(data.accessToken)
                localStorage.setItem('accessToken', data.accessToken)
            }
        }
        getToken()
    }, [user])

    return [token]
}

export default useToken
