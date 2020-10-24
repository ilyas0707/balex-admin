import React from 'react'
import { NavLink } from 'react-router-dom'
import Styles from './Income.module.css'

export const Income = () => {
    const test = [
        { status: 1, carNumber: 'AC56789', volume: 3500 },
        { status: 0, carNumber: 'AC56789', volume: 3500 },
        { status: 0, carNumber: 'AC56789', volume: 3500 },
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
        <div className={Styles.income}>
            <h3 className={Styles.heading}>
                Приход
                <NavLink activeClassName={Styles.active} to={`/panel/income/create`}>
                    <i className={`material-icons ${Styles.create}`}>library_add</i>
                </NavLink>
            </h3>
            <div className={`${Styles.item} ${Styles.edit}`}>
                <span className={Styles.status}><i className={`material-icons ${Styles.hidden}`}>done</i></span>
                <p className={Styles.main}>
                    <span>Гос. номер</span>
                    <span>Объём</span>
                </p>
            </div>
            <div className={Styles.block}>
                {
                    test.sort(sortByStatus).map(({status, carNumber, volume}, i) => {
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
                                    <span>{ carNumber }</span>
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