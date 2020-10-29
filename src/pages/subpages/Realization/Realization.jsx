import React from 'react'
import { NavLink } from 'react-router-dom'
import { Export } from '../../../components/Export/Export'
import { useTest } from '../../../hooks/test.hook'
import Styles from './Realization.module.css'

export const Realization = () => {
    const { manufacturing, realization } = useTest()
    const total = []
    const toExcel = total.concat({'#': 'Выработка'}, manufacturing, {'#': 'Реализация'}, realization)

    return (
        <div className={Styles.realization}>
            <h3 className={Styles.heading}>
                Реализация
                <NavLink activeClassName={Styles.active} to={`/panel/realization/create`}>
                    <i className={`material-icons ${Styles.create}`}>library_add</i>
                </NavLink>
            </h3>
            <div className={Styles.block}>
                <table cellPadding="7" border="1" bordercolor="#304269" className={Styles.table}>
                    <caption>Реализация</caption>
                    <thead>
                        <tr><th>Слой</th><th>Размер</th><th>Объём</th><th>Клиент</th><th>Цена(m2)</th><th>Итого</th><th>Дата</th></tr>
                    </thead>
                    <tbody>
                        {
                            realization.map(({ layer, size, volume, client, price, date }, i) => {
                                return (
                                    <tr key={ i }>
                                        <td>{ layer }</td>
                                        <td>{ size }</td>
                                        <td>{ volume }</td>
                                        <td>{ client }</td>
                                        <td>{ price }</td>
                                        <td>{ volume * price }</td>
                                        <td width="1%">{ `${date.getDay()}/${date.getMonth()}/${date.getFullYear()}` }</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
                <table cellPadding="7" border="1" bordercolor="#304269" className={Styles.table}>
                    <caption>Выработка</caption>
                    <thead>
                        <tr><th>Слои</th><th>Размер</th><th>Объём</th></tr>
                    </thead>
                    <tbody>
                        {
                            manufacturing.map(({ layer, size, volume }, i) => {
                                return (
                                    <tr key={ i }>
                                        <td>{ layer }</td>
                                        <td>{ size }</td>
                                        <td>{ volume }</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
            <Export tableData={toExcel} fileName="realization" />
        </div>
    )
}