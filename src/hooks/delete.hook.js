import { useCallback } from "react"
import { useAuth } from "./auth.hook"
import { useHttp } from "./http.hook"
import { useSuccess } from './success.hook'
import { useHistory } from "react-router-dom"

import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'

export const useDelete = (component) => {
    toast.configure({
        position: 'top-center',
        autoClose: 3000,
        draggable: true
    })
    
    const { code } = useAuth()
    const { request, API_URL } = useHttp()
    const successMessage = useSuccess()
    const history = useHistory()

    const deleteHandler = useCallback(async (url, id) => {
        const pass = window.confirm("Вы уверенны?");
        if (pass) {
            try {
                const data = await request(`${API_URL}${url}/${id}`, "DELETE", null, {
                    Authorization: `Basic ${code.hashed}`
                })
                successMessage(data.message)
                history.push('/')
                history.push(`panel/${component}`)
            } catch (e) {}
        }

    }, [code, request, API_URL, component, history, successMessage])

    return { deleteHandler }
}