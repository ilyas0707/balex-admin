import React from 'react'
// import { useDelete } from '../../../hooks/delete.hook'
import Styles from './Client.module.css'

export const Client = ({ data }) => {
    // const { deleteHandler } = useDelete(`patients`)

    console.log(data)

    return (
        <div className={Styles.patient}>
            <h2 className={Styles.heading}>
                Данные клиента
                {/* <button className={Styles.button} onClick={() => {deleteHandler('api/patientController/deletePatientsCard', data.id)}}>
                    <i className={`material-icons ${Styles.delete}`}>delete</i>
                </button> */}
            </h2>
            <div className={Styles.block}>
                <div className={Styles.card}>
                    <div className={Styles.info}>
                        <ul>
                            <li className={Styles.item}>
                                {`${data.name} ${data.surName}` || 'Полное имя'}
                            </li>
                            <li className={Styles.item}>
                                <i className={`material-icons ${Styles.icon}`}>email</i>
                                {data.email || 'example@gmail.com'}
                            </li>
                            <li className={Styles.item}>
                                <i className={`material-icons ${Styles.icon}`}>phone</i>
                                {`+996${data.phoneNumber || '700000000'}`}
                            </li>
                        </ul>
                    </div>
                </div>
                <div className={Styles.data}>
                    <ul>
                        <li><b>Адрес:</b> { data.address === null ? '---' : data.address }, { data.country === null ? '---' : data.country }</li>
                        <li><b>Баланс:</b> { data.balance === null ? '---' : data.balance }</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
