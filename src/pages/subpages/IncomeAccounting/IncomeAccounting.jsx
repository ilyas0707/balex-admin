import React from 'react'
import { NavLink } from 'react-router-dom'
import { Export } from '../../../components/Export/Export'
import { useGet } from '../../../hooks/get.hook'
import { useSort } from '../../../hooks/sort.hook'
import { useIncome } from '../../../hooks/income.hook'
import Styles from './IncomeAccounting.module.css'

export const IncomeAccounting = () => {
    const { data, loading, admin } = useGet('/api/stoneIncome/getAllSections')
    const { sortByStatus } = useSort()
    const { incomeData } = useIncome(data.income)
    let total = []
    const toExcel = total.concat({'#': 'Приходы'}, incomeData)

    if (loading) {
        return (
            <>
                {
                    admin ?
                    admin.length === 1 ?
                    '' :
                    <h3 className={Styles.heading}>
                        Приход <br/> (Бухгалтер)
                        <NavLink activeClassName={Styles.active} to={`/panel/incomeAccounting/create`}>
                            <i className={`material-icons ${Styles.create}`}>library_add</i>
                        </NavLink>
                    </h3> : ''
                }
                <div className={Styles.loading}></div>
            </>
        )
    }
    if (admin) {
        if (admin.length === 1) {
            return (
                <div className={Styles.warning}><i className={`material-icons ${Styles.icon}`}>error</i></div>
            )
        }
    }
    return (
        <div className={Styles.income}>
            <h3 className={Styles.heading}>
                Приход <br/> (Бухгалтер)
                <NavLink activeClassName={Styles.active} to={`/panel/incomeAccounting/create`}>
                    <i className={`material-icons ${Styles.create}`}>library_add</i>
                </NavLink>
            </h3>
            <div className={Styles.block}>
                <div className={Styles.wrapper}>
                    <table cellPadding="7" border="1" bordercolor="#304269" className={Styles.table}>
                        <caption>Приходы</caption>
                        <thead>
                            <tr><th>Накладная</th><th>ФИО</th><th>Гос.номер</th><th>Слой</th><th>Объём</th><th>Цена(m3)</th><th>Итого</th><th>Оплачено</th><th>Дата</th></tr>
                        </thead>
                        <tbody>
                            {
                                incomeData ?
                                incomeData.sort(sortByStatus).map(({ billNumber, driverName, carNumber, layer, volume, pricePerCube, total, pricePaid, statusPaid, date }, i) => {
                                    return (
                                        <tr key={ i } className={statusPaid === 1 ? Styles.paid : ''}>
                                            <td>{ billNumber }</td>
                                            <td>{ driverName }</td>
                                            <td>{ carNumber }</td>
                                            <td>{ layer }</td>
                                            <td>{ volume }</td>
                                            <td>{ pricePerCube }</td>
                                            <td>{ total }</td>
                                            <td>{ pricePaid }</td>
                                            <td width="1%">{ date }</td>
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
                <Export tableData={toExcel} fileName="incomeAccounting" /> : ''
            }
        </div>
    )
}