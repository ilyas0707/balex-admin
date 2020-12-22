import { useEffect, useState } from "react"
import { useAuth } from "./auth.hook"
import { useHttp } from "./http.hook"

export const useGet = (url, url2, url3) => {
    url2 = url2 || url
    url3 = url3 || url

    const { code, profile } = useAuth()
    const admin = profile.userRole
    const { loading, request, API_URL } = useHttp()
    const [data, setData] = useState([])
    const [data2, setData2] = useState([])
    const [data3, setData3] = useState([])

    useEffect(() => {
        let mounted = true
        try {
            if (mounted && code) {
                request(`${API_URL}${url}`, "GET", null, {
                    Authorization: `Basic ${code.hashed}`
                }).then(result => {
                    setData(result)
                })

                request(`${API_URL}${url2}`, "GET", null, {
                    Authorization: `Basic ${code.hashed}`
                }).then(result => {
                    setData2(result)
                })

                request(`${API_URL}${url3}`, "GET", null, {
                    Authorization: `Basic ${code.hashed}`
                }).then(result => {
                    setData3(result)
                })
            }
        } catch (e) {}
        return () => mounted = false
    }, [request, API_URL, code, url, url2, url3])

    return { data, data2, data3, loading, admin }
}