import React from 'react'
import Styles from './Profile.module.css'

import { useAuth } from '../../../hooks/auth.hook'
import { NavLink } from 'react-router-dom'
import { useGet } from '../../../hooks/get.hook'
import { useUsers } from '../../../hooks/users.hook'
import { useDelete } from '../../../hooks/delete.hook'
import { useRole } from '../../../hooks/role.hook'
import { ExportPast } from '../../../components/ExportPast/ExportPast'

import Man from './../../../assets/icons/man.png'
import Woman from './../../../assets/icons/woman.png'

export const Profile = () => {
    const { profile } = useAuth()
    const { data, loading } = useGet('/admin/users/getAll')
    const { usersData } = useUsers(data.object)
    const { deleteHandler } = useDelete('profile')
    const { roleHandler } = useRole('profile')
    const user = profile.object
    const admin = profile.userRole

    if (loading) {
        return (
            <div className={Styles.loading}></div>
        )
    }

    if (admin) {
        var found = false
        for(var i = 0; i < admin.length; i++) {
            if (admin[i].role === 'ROLE_ADMIN') {
                found = true
                break
            } else {
                found = false
            }
        }

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
                            found ? 
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
                {
                    found ? 
                    <div className={Styles.wrapper}>
                        <table cellPadding="10" border="0" bordercolor="#304269" className={Styles.table}>
                            <caption>Пользователи</caption>
                            <thead>
                                <tr><th>Имя</th><th>Логин</th><th>Роль</th><th></th><th></th></tr>
                            </thead>
                            <tbody>
                                {
                                    usersData ?
                                    usersData.map(({ id, fullname, username, role }, i) => {
                                        return username === 'god' ? null :
                                        <tr key={ i }>
                                            <td>{ fullname }</td>
                                            <td>{ username }</td>
                                            <td>{ role }</td>
                                            <td width="1%">
                                                <button className={Styles.deleteButton} type="submit" onClick={() => {deleteHandler('/admin/users/delete', id)}}><i className={`material-icons ${Styles.delete}`}>delete</i></button>
                                            </td>
                                            <td width="1%">
                                                <button className={Styles.deleteButton} type="submit" onClick={() => {roleHandler('/admin/userRoles/createForUser', id)}}><i className={`material-icons ${Styles.delete}`}>admin_panel_settings</i></button>
                                            </td>
                                        </tr>
                                    }) : null
                                }
                            </tbody>
                        </table>
                    </div> : ''
                }
                {
                    found ?
                    <ExportPast /> : ''
                }
            </>
        )
    }

    return (
        <div></div>
    )
}