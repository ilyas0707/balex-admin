import React, { useState } from 'react'
import Styles from './Form.module.css'

import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'
import { useAuth } from '../../hooks/auth.hook'
import { useHttp } from '../../hooks/http.hook'
import { useSuccess } from '../../hooks/success.hook'
import { useError } from '../../hooks/error.hook'
import { useHistory } from 'react-router-dom'

export const Form = ({component, id, data, select, url, machines, clients}) => {
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
    const history = useHistory()

    const addIncome = async () => {
        try {
            const data = await request(`${API_URL}/${url}`, "POST", {...form}, {
                Authorization: `Basic ${code.hashed}`
            })
            if (data.successful === false) {
                errorMessage("Поля не должны быть пустыми!")
            } else {
                successMessage(data.message)
            }
            history.push('/')
            if (component === 'createUser') {
                history.push('panel/profile/createUser')
            } else if (component === 'income') {
                history.push('panel/income/create')
            } else if (component === 'outcome') {
                history.push('panel/outcome/create')
            } else if (component === 'incomeAccounting') {
                history.push('panel/incomeAccounting/create')
            } else if (component === 'manufacturing') {
                history.push('panel/manufacturing/create')
            } else if (component === 'realization') {
                history.push('panel/realization/create')
            } else if (component === 'analytics') {
                history.push('panel/analytics/create')
            }
        } catch (e) {
            errorMessage("Поля не должны быть пустыми!")
        }
    }

    const changeHandler = e => {
        if (id === 'incomeAccounting') {
            // eslint-disable-next-line
            clients.map((element) => {
                setForm({ 
                    ...form, [e.target.name]: element.id === +e.target.value ? 
                    +e.target.value : e.target.name === 'pricePaid' ?
                    +e.target.value : +e.target.value
                })
            })
        }
        else if (id === 'outcome') {
            // eslint-disable-next-line
            machines.map((element) => {
                setForm({ 
                    ...form, [e.target.name]: element.name === e.target.value ? 
                    element : e.target.name === 'stoneVolume' ? 
                    +e.target.value : e.target.value
                })
            })
        } else {
            setForm({ 
                ...form, [e.target.name]: e.target.name === 'volume' || 
                e.target.name === 'pricePerCube' ||
                e.target.name === 'square' ||
                e.target.name === 'pricePerSquare' ||
                e.target.name === 'age' || 
                e.target.name === 'value' ?
                +e.target.value : e.target.value
            })
        }
    }

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
                                        options.map((element) => {
                                            return (
                                                element ?
                                                element.map(({label, id}, i) => {
                                                    return (
                                                        <option key={ i } value={ id }>{ label }</option>
                                                    )
                                                }) : ''
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
                    data.map(({type, name, label}, i) => {
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
                    }) : ''
                }
            </div>
            <div className={Styles.button}>
                <button type="submit" onClick={() => {addIncome()}} className={Styles.submit}>Создать</button>
            </div>
        </div>
    )
}