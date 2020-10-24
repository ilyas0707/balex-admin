import React, { useState } from 'react'
import Styles from './Form.module.css'

import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'
import { useAuth } from '../../hooks/auth.hook'
import { useHttp } from '../../hooks/http.hook'
import { useSuccess } from '../../hooks/success.hook'
import { useError } from '../../hooks/error.hook'

export const Form = ({data, select, url}) => {
    toast.configure({
        position: 'top-center',
        autoClose: 3000,
        draggable: true
    })

    const { code } = useAuth()
    const { request, API_URL } = useHttp()
    const successMessage = useSuccess()
    const errorMessage = useError()
    const [form, setForm] = useState({})

    const addIncome = async () => {
        try {
            const data = await request(`${API_URL}/${url}/add`, "POST", {...form}, {
                Authorization: `Basic ${code.hashed}`
            })
            successMessage(data.message)
        } catch (e) {
            errorMessage("Поля не должны быть пустыми!")
        }
    }

    const changeHandler = e => {     
        setForm({ 
            ...form, [e.target.name]: e.target.value
        })
    }

    console.log(form);
    
    return (
        <div className={Styles.form}>
            <div className={Styles.block}>
                {
                    select ?
                    select.map(({name, options}, i) => {
                        return (
                            <div key={ i } className={`${Styles.item} ${Styles.relative}`}>
                                <select className={Styles.select} name={ name } onChange={changeHandler}>
                                    {
                                        options.map(({label, id}, i) => {
                                            return (
                                                <option key={ i } value={ id }>{ label }</option>
                                            )
                                        })
                                    }
                                </select>
                                <i className={`material-icons ${Styles.icon}`}>play_arrow</i>
                            </div>
                        )
                    }) : ''
                }
                {
                    data ?
                    data.map((element, i) => {
                        return element.map(({type, name, label}) => {
                            return (
                                <div key={ i } className={Styles.item}>
                                    <input 
                                        type={ type }
                                        className={Styles.input}
                                        name={ name }
                                        placeholder={ label }
                                        autoComplete="off"
                                        onChange={changeHandler} />
                                </div>
                            )
                        })
                    }) : ''
                }
            </div>
            <div className={Styles.button}>
                <button type="submit" onClick={() => {addIncome()}} className={Styles.submit}>Создать</button>
            </div>
        </div>
    )
}