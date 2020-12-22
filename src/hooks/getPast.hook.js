import { useState } from "react"
import { useAuth } from "./auth.hook"
import { useHttp } from "./http.hook"

export const useGetPast = () => {
    const { code } = useAuth()
    const { loading, request, API_URL } = useHttp()
    const [data, setData] = useState({})

    const pastHandler = (url, body) => {
        try {
            request(`${API_URL}${url}`, "POST", {...body}, {
                Authorization: `Basic ${code.hashed}`
            }).then(result => {
                setData(result)
            })
        } catch (e) {}

    }

    return { pastHandler, data, loading }
}