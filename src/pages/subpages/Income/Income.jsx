import React from 'react'
import { NavLink } from 'react-router-dom'
import { Export } from '../../../components/Export/Export'
import { useSort } from '../../../hooks/sort.hook'
import { useTest } from '../../../hooks/test.hook'
import Styles from './Income.module.css'

export const Income = () => {
    const { sortByStatus } = useSort()
    const { income, outcome, leftover } = useTest()
    const total = []
    const toExcel = total.concat({'#': 'Приходы'}, income, {'#': 'Расходы'}, outcome, {'#': 'Остаток'}, leftover)

    return (
        <div className={Styles.income}>
            <h3 className={Styles.heading}>
                Данные
                <NavLink activeClassName={Styles.active} to={`/panel/income/create`}>
                    <i className={`material-icons ${Styles.create}`}>library_add</i>
                </NavLink>
            </h3>
            <div className={Styles.block}>
                <table cellPadding="7" border="1" bordercolor="#304269" className={Styles.table}>
                    <caption>Приходы</caption>
                    <thead>
                        <tr><th>Накладная</th><th>ФИО</th><th>Гос.номер</th><th>Объём</th><th>Цена(m3)</th><th>Итого</th><th>Дата</th></tr>
                    </thead>
                    <tbody>
                        {
                            income.map(({ billNumber, fullname, carNumber, volume, price, date }, i) => {
                                return (
                                    <tr key={ i }>
                                        <td>{ billNumber }</td>
                                        <td>{ fullname }</td>
                                        <td>{ carNumber }</td>
                                        <td>{ volume }</td>
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
                    <caption>Расходы</caption>
                    <thead>
                        <tr><th>Станок</th><th>Объём</th><th>Дата</th></tr>
                    </thead>
                    <tbody>
                        {
                            outcome.map(({ machine, volume, date }, i) => {
                                return (
                                    <tr key={ i }>
                                        <td>{ machine }</td>
                                        <td>{ volume }</td>
                                        <td width="1%">{ `${date.getDay()}/${date.getMonth()}/${date.getFullYear()}` }</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
                <table cellPadding="7" border="1" bordercolor="#304269" className={Styles.table}>
                    <caption>Остаток</caption>
                    <thead>
                        <tr><th>Объём</th></tr>
                    </thead>
                    <tbody>
                        {
                            leftover.map(({ volume }, i) => {
                                return (
                                    <tr key={ i }>
                                        <td>{ volume }</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
            <Export tableData={toExcel} fileName="income" />
        </div>
    )
}