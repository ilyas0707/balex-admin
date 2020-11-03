import React from 'react'
import Styles from './Profile.module.css'

import { useAuth } from '../../../hooks/auth.hook'
import { NavLink } from 'react-router-dom'

import Man from './../../../assets/icons/man.png'
import Woman from './../../../assets/icons/woman.png'

import { LineChart, ResponsiveContainer, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

export const Profile = () => {
    const { profile } = useAuth()
    const user = profile.object
    const admin = profile.userRole

    const line = [
        { name: 'Янв.', 'Приход': 4000, 'Реализация': 2400 },
        { name: 'Фев.', 'Приход': 3000, 'Реализация': 1398 },
        { name: 'Март', 'Приход': 2000, 'Реализация': 9800 },
        { name: 'Апр.', 'Приход': 2780, 'Реализация': 3908 },
        { name: 'Май', 'Приход': 1890, 'Реализация': 4800 },
        { name: 'Июнь', 'Приход': 2390, 'Реализация': 3800 },
        { name: 'Июль', 'Приход': 3490, 'Реализация': 4300 },
        { name: 'Авг.', 'Приход': 1100, 'Реализация': 1500 },
        { name: 'Сент.', 'Приход': 3400, 'Реализация': 2200 },
        { name: 'Окт.', 'Приход': 2560, 'Реализация': 3700 },
        { name: 'Нояб.', 'Приход': 1400, 'Реализация': 1900 },
        { name: 'Дек.', 'Приход': 3600, 'Реализация': 2450 },
    ]

    if (admin) {
        return (
            <>
                <div className={Styles.profile}>
                    <div className={Styles.card}>
                        <div className={Styles.avatar}>
                            {user.gender === 'MALE' ? 
                            <img src={Man} alt="man" /> :
                            <img src={Woman} alt="woman" />}
                        </div>
                        <div className={Styles.info}>
                            <ul>
                                <li className={Styles.item}>
                                    {user.fullname || 'Полное имя'}
                                </li>
                                <li className={Styles.item}>
                                    <i className={`material-icons ${Styles.icon}`}>email</i>
                                    {user.email || 'example@gmail.com'}
                                </li>
                                <li className={Styles.item}>
                                    <i className={`material-icons ${Styles.icon}`}>phone</i>
                                    {`+996${user.phoneNumber || '700000000'}`}
                                </li>
                                <li className={Styles.item}>
                                    {`Возраст: ${user.age || 'Возраст'}`}
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className={Styles.buttons}>
                        { 
                            admin.length > 1 ? 
                            <NavLink activeClassName={Styles.active} to={`/panel/profile/createUser`}>
                                <i className={`material-icons ${Styles.key}`}>create</i>
                                <span className={Styles.text}>Создать</span>
                            </NavLink> : ''
                        }
                        <NavLink activeClassName={Styles.active} to={`/panel/profile/changePassword`}>
                            <i className={`material-icons ${Styles.key}`}>vpn_key</i>
                            <span className={Styles.text}>Изменить пароль</span>
                        </NavLink>
                    </div>
                </div>
                <div className={Styles.block}>
                    <div className={Styles.chart}>
                        <ResponsiveContainer>
                            <LineChart
                                data={line}
                                margin={{
                                top: 5, right: 30, left: 20, bottom: 5,
                                }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="Реализация" stroke="#304269" />
                                <Line type="monotone" dataKey="Приход" stroke="#F26101" activeDot={{ r: 8 }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </>
        )
    }

    return (
        <div></div>
    )
}