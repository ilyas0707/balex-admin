import React from 'react'
import { NavLink } from 'react-router-dom'
import Styles from './Realization.module.css'

export const Realization = () => {
    const test = [
        { status: 1, usage: 'Каменные плиты', volume: 3500 },
    ]

    return (
        <div className={Styles.realization}>
            <h3 className={Styles.heading}>
                Реализация
                <NavLink activeClassName={Styles.active} to={`/panel/realization/create`}>
                    <i className={`material-icons ${Styles.create}`}>library_add</i>
                </NavLink>
            </h3>
            <div className={`${Styles.item} ${Styles.edit}`}>
                <span className={Styles.status}><i className={`material-icons ${Styles.hidden}`}>done</i></span>
                <p className={Styles.main}>
                    <span>Использовано</span>
                    <span>Объём</span>
                </p>
            </div>
            <div className={Styles.block}>
                {
                    test.map(({status, usage, volume}, i) => {
                        return (
                            <div key={ i } className={`${Styles.item} ${status === 1 ? Styles.done : ''}`}>
                                <span className={Styles.status}>
                                    {
                                        status === 0 ?
                                        <i className={`material-icons ${Styles.icon}`}>cached</i> :
                                        status === 1 ?
                                        <i className={`material-icons ${Styles.icon}`}>done</i> :
                                        ""
                                    }
                                </span>
                                <p className={Styles.main}>
                                    <span>{ usage }</span>
                                    <span>{ `${volume}m3` }</span>
                                </p>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}