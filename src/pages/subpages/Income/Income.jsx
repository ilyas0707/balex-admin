import React from 'react'
import { NavLink } from 'react-router-dom'
import { Export } from '../../../components/Export/Export'
import { useGet } from '../../../hooks/get.hook'
import { useDelete } from '../../../hooks/delete.hook'
import { useIncome } from '../../../hooks/income.hook'
import Styles from './Income.module.css'

export const Income = () => {
    const { data, loading, admin } = useGet('/api/stoneIncome/getAllSections')
    const { deleteHandler } = useDelete('income')
    const { incomeData, outcomeData, remainderData } = useIncome(data.income, data.outcome, data.remainder)
    let total = []
    const toExcel = total.concat({'#': 'Приходы'}, incomeData, {'#': 'Расходы'}, outcomeData, {'#': 'Остаток'}, remainderData)

    var found = false
    if (admin) {
        for(var i = 0; i < admin.length; i++) {
            if (admin[i].role === 'ROLE_ADMIN') {
                found = true
                break
            } else {
                found = false
            }
        }
    }
        
    if (loading) {
        return (
            <>
                <h3 className={Styles.heading}>
                    Приход
                </h3>
                <div className={Styles.loading}></div>
            </>
        )
    }
    return (
        <div className={Styles.income}>
            <h3 className={Styles.heading}>
                Приход
            </h3>
            <div className={Styles.block}>
                <div className={Styles.wrapper}>
                    <table cellPadding="7" border="1" bordercolor="#304269" className={Styles.table}>
                        <caption>
                            Приходы
                            {
                                found ? 
                                <NavLink activeClassName={Styles.active} to={`/panel/income/create`}>
                                    <i className={`material-icons ${Styles.create}`}>library_add</i>
                                </NavLink> : ''
                            }
                        </caption>
                        <thead>
                            <tr><th>Накладная</th><th>ФИО</th><th>Гос.номер</th><th>Слой</th><th>Объём</th><th>Цена(m3)</th><th>Итого</th><th>Дата</th>{found ? <th></th> : null}</tr>
                        </thead>
                        <tbody>
                            {
                                incomeData ?
                                incomeData.map(({ id, billNumber, driverName, carNumber, layer, volume, pricePerCube, total, date }, i) => {
                                    return (
                                        <tr key={ i }>
                                            <td>{ billNumber }</td>
                                            <td>{ driverName }</td>
                                            <td>{ carNumber }</td>
                                            <td>{ layer }</td>
                                            <td>{ volume }</td>
                                            <td>{ pricePerCube }</td>
                                            <td>{ total }</td>
                                            <td width="1%">{ date }</td>
                                            {
                                                found ?
                                                <td width="1%">
                                                    <button className={Styles.deleteButton} type="submit" onClick={() => {deleteHandler('/api/stoneIncome/delete', id)}}><i className={`material-icons ${Styles.delete}`}>delete</i></button>
                                                </td> : null
                                            }
                                        </tr>
                                    )
                                }) : null
                            }
                        </tbody>
                    </table>
                </div>
                <div className={Styles.wrapper}>
                    <table cellPadding="7" border="1" bordercolor="#304269" className={Styles.table}>
                        <caption>
                            Расходы
                            {
                                found ? 
                                <NavLink activeClassName={Styles.active} to={`/panel/outcome/create`}>
                                    <i className={`material-icons ${Styles.create}`}>library_add</i>
                                </NavLink> : ''
                            }
                        </caption>
                        <thead>
                            <tr><th>Станок</th><th>Слой</th><th>Объём</th><th>Дата</th>{found ? <th></th> : null}</tr>
                        </thead>
                        <tbody>
                            {
                                outcomeData ?
                                outcomeData.map(({ id, layer, stoneMachine, stoneVolume, date }, i) => {
                                    return (
                                        <tr key={ i }>
                                            <td>{ stoneMachine }</td>
                                            <td>{ layer }</td>
                                            <td>{ stoneVolume }</td>
                                            <td width="1%">{ date }</td>
                                            {
                                                found ?
                                                <td width="1%">
                                                    <button className={Styles.deleteButton} type="submit" onClick={() => {deleteHandler('/admin/stoneOutcome/delete', id)}}><i className={`material-icons ${Styles.delete}`}>delete</i></button>
                                                </td> : null
                                            }
                                        </tr>
                                    )
                                }) : null
                            }
                        </tbody>
                    </table>
                </div>
                <div className={Styles.wrapper}>
                    <table cellPadding="7" border="1" bordercolor="#304269" className={Styles.table}>
                        <caption>Остаток</caption>
                        <thead>
                            <tr><th>Слой</th><th>Объём</th></tr>
                        </thead>
                        <tbody>
                            {
                                remainderData ?
                                remainderData.map(({ layer, volume }, i) => {
                                    return (
                                        <tr key={ i }>
                                            <td>{ layer }</td>
                                            <td>{ volume }</td>
                                        </tr>
                                    )
                                }) : null
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            {
                data.income && data.outcome && data.remainder ?
                <Export tableData={toExcel} fileName="income" /> : ''
            }
        </div>
    )
}