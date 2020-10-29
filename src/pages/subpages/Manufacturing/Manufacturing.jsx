import React from 'react'
import { NavLink } from 'react-router-dom'
import { Export } from '../../../components/Export/Export'
import { useSort } from '../../../hooks/sort.hook'
import { useTest } from '../../../hooks/test.hook'
import Styles from './Manufacturing.module.css'

export const Manufacturing = () => {
    const { sortByStatus } = useSort()
    const { manufacturing, outcome, leftover } = useTest()
    const total = []
    const toExcel = total.concat({'#': 'Расходы'}, outcome, {'#': 'Выработка'}, manufacturing, {'#': 'Остаток'}, leftover)

    return (
        <div className={Styles.manufacturing}>
            <h3 className={Styles.heading}>
                Обработка
                <NavLink activeClassName={Styles.active} to={`/panel/manufacturing/create`}>
                    <i className={`material-icons ${Styles.create}`}>library_add</i>
                </NavLink>
            </h3>
            <div className={Styles.block}>
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
                    <caption>Выработка</caption>
                    <thead>
                        <tr><th>Слой</th><th>Размер</th><th>Объём</th></tr>
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
            <Export tableData={toExcel} fileName="manufacturing" />
        </div>
    )
}