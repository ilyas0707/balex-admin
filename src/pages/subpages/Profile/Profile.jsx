import React from 'react'
import Styles from './Profile.module.css'

import { useAuth } from '../../../hooks/auth.hook'
import { NavLink } from 'react-router-dom'

export const Profile = () => {
    const { profile } = useAuth()
    const user = profile.object

    return (
        <>
            <div className={Styles.profile}>
                <div className={Styles.card}>
                    <div className={Styles.info}>
                        <ul>
                            <li className={Styles.item}>
                                {`${user.name} ${user.surName}` || 'Полное имя'}
                            </li>
                            <li className={Styles.item}>
                                <i className={`material-icons ${Styles.icon}`}>email</i>
                                {user.email || 'example@gmail.com'}
                            </li>
                            <li className={Styles.item}>
                                <i className={`material-icons ${Styles.icon}`}>phone</i>
                                {`+996${user.phoneNumber || '700000000'}`}
                            </li>
                        </ul>
                    </div>
                </div>
                <div className={Styles.buttons}>
                    <NavLink activeClassName={Styles.active} to={`/panel/profile/createUser`}>
                        <i className={`material-icons ${Styles.key}`}>create</i>
                        <span className={Styles.text}>Создать</span>
                    </NavLink>
                    <NavLink activeClassName={Styles.active} to={`/panel/profile/changePassword`}>
                        <i className={`material-icons ${Styles.key}`}>vpn_key</i>
                        <span className={Styles.text}>Изменить пароль</span>
                    </NavLink>
                </div>
            </div>
        </>
    )
}