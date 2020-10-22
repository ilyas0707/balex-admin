import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Topline } from '../../components/Topline/Topline'
import { Scene } from '../../components/Scene/Scene'
import Styles from './Dashboard.module.css'

export const Dashboard = () => {
    const [open, setOpen] = useState(false)

    const openMenu = event => {
        event.preventDefault()

        if (open === false){
            setOpen(true)
        } else {
            setOpen(false)
        }
    }

    const links = [
        { title: 'Приход камня', link: 'income', icon: 'move_to_inbox' },
        { title: 'Реализация камня', link: 'realization', icon: 'assignment_turned_in' },
        { title: 'Отчёт', link: 'analytics', icon: 'assessment' },
    ]

    const items = links.map(({title, link, icon}, i) => {
        return (
            <li key={ i } className={Styles.item}>
                <NavLink activeClassName={Styles.active} to={`/panel/${ link }`}>
                    <i className={`material-icons ${Styles.icon}`}>{ icon }</i>
                    <span className={Styles.text}>{ title }</span>
                </NavLink>
            </li>
        )
    })

    return (
        <div className={Styles.dashboard}>
            <nav className={`${Styles.navbar} ${open ? Styles.open : ""}`}>
                <div className={Styles.flexBlock}>
                    <div className={`${Styles.title} ${open ? Styles.open : ""}`}>
                        <NavLink to="/panel/analytics" className={`${Styles.logo} ${open ? Styles.open : ""}`}>Stone</NavLink>
                        <a href="/" className={Styles.ham} onClick={openMenu}>
                            <span className={`${Styles.line} ${open ? Styles.open : ""}`}></span>
                            <span className={`${Styles.line} ${open ? Styles.open : ""}`}></span>
                            <span className={`${Styles.line} ${open ? Styles.open : ""}`}></span>
                        </a>
                    </div>
                </div>
                <ul className={`${Styles.menu} ${open ? Styles.open : ""}`}>
                    { items }
                </ul>
            </nav>
            <div className={Styles.main}>
                <Topline />
                <Scene />
            </div>
        </div>
    )
}