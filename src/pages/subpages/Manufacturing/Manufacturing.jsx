import React from 'react'
import { NavLink } from 'react-router-dom'
import Styles from './Manufacturing.module.css'

export const Manufacturing = () => {
    const test = [
        { status: 1, usage: 'Каменные плиты', volume: 3500 },
        { status: 0, usage: 'Каменные плиты', volume: 3500 },
        { status: 0, usage: 'Каменные плиты', volume: 3500 },
    ]

    function sortByStatus(a, b) {
        if (a.status > b.status) {
            return 1
        } else if (a.status < b.status) {
            return -1
        } else {
            return 0
        }
    }

    return (
        <div className={Styles.manufacturing}>
            <h3 className={Styles.heading}>
                Обработка
                <NavLink activeClassName={Styles.active} to={`/panel/manufacturing/create`}>
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
                    test.sort(sortByStatus).map(({status, usage, volume}, i) => {
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