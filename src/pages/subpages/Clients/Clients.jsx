import React, { useState } from 'react'
import Styles from './Clients.module.css'
import { useGet } from '../../../hooks/get.hook'
import { NavLink } from 'react-router-dom'
// import { useDelete } from '../../../hooks/delete.hook'
import Fuse from "fuse.js"
import { useClients } from '../../../hooks/clients.hook'

export const Clients = () => {
    const [form, setForm] = useState("")
    const { data, loading } = useGet('/api/users/getAll')
    // const { deleteHandler } = useDelete('orders')
    const { clientsData } = useClients(data.object)

    const fuse = new Fuse(clientsData, {
        keys: [
            'name'
        ]
    })

    const results = fuse.search(form, { limit: 3 })
    const clientsDataFiltered = form ? results.map(result => result.item) : clientsData

    const changeHandler = ({ currentTarget = {} }) => {
        const { value } = currentTarget
        setForm(value)
    }


    console.log(data)

    if (loading) {
        return (
            <>
                <h3 className={Styles.heading}>
                    Клиенты
                </h3>
                <div className={Styles.loading}></div>
            </>
        )
    }

    return (
        <div className={Styles.clients}>
            <h3 className={Styles.heading}>
                Клиенты
                <NavLink activeClassName={Styles.active} to={`/panel/client/create`}>
                    <i className={`material-icons ${Styles.create}`}>library_add</i>
                </NavLink>
            </h3>
            <div className={Styles.search}>
                <input type="text" className={Styles.input} name="fullname" onChange={changeHandler} placeholder="Поиск..." autoComplete="off" />
            </div>
            <div className={Styles.block}>
                {
                    clientsDataFiltered.length !== 0 ?
                    clientsDataFiltered.map(({ id, name, surName }, i) => {
                        return (
                            <NavLink key={ i } to={`/panel/clients/${id}`} className={Styles.patient}>
                                <div className={Styles.link}>
                                    <span>{ name } { surName }</span>
                                </div>
                                <span className={Styles.flag}>{ id }</span>
                            </NavLink>
                        )
                    }) : <h2 className="empty">
                             <i className={`material-icons search`}>search_off</i>
                             Ничего не найдено!
                         </h2>
                }
            </div>
        </div>
    )
}
