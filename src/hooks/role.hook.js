import { useCallback } from "react"
import { useAuth } from "./auth.hook"
import { useHttp } from "./http.hook"
import { useSuccess } from './success.hook'
import { useHistory } from "react-router-dom"

import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'

export const useRole = (component) => {
    toast.configure({
        position: 'top-center',
        autoClose: 3000,
        draggable: true
    })
    
    const { code } = useAuth()
    const { request, API_URL } = useHttp()
    const successMessage = useSuccess()
    const history = useHistory()

    const roleHandler = useCallback(async (url, id) => {
        const role = window.prompt('admin - Админ, accountant - Бухгалтер');
        try {
            const data = await request(`${API_URL}${url}/${id}`, "POST", {
                role: role === 'admin' ? "ROLE_ADMIN" : role === 'accountant' ? 'ROLE_ACCOUNTANT' : '' 
            }, {
                Authorization: `Basic ${code.hashed}`
            })
            successMessage(data.message)
            history.push('/')
            history.push(`panel/${component}`)
        } catch (e) {}

    }, [code, request, API_URL, component, history, successMessage])

    return { roleHandler }
}