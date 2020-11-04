import React from 'react'
import { NavLink } from 'react-router-dom';
import { Export } from '../../../components/Export/Export';
import { useAnalytics } from '../../../hooks/analytics.hook';
import { useGet } from '../../../hooks/get.hook';
import { useDelete } from '../../../hooks/delete.hook';
import Styles from './Analytics.module.css'

export const Analytics = () => {
    const { data, loading, admin } = useGet('/admin/finance/getThisMonthSections')
    const { deleteHandler } = useDelete('finance')
    const { incomeData, expensesData } = useAnalytics(data.income, data.expense)
    const total = []
    const toExcel = total.concat({'#': 'Приходящие транзакции'}, incomeData, {'#': 'Уходящие транзакции'}, expensesData)

    if (loading) {
        return (
            <>
                {
                    admin ?
                    admin.length === 1 ?
                    '' :
                    <h3 className={Styles.heading}>
                        Финансы
                        {
                            admin ?
                            admin.length > 1 ? 
                            <NavLink activeClassName={Styles.active} to={`/panel/analytics/create`}>
                                <i className={`material-icons ${Styles.create}`}>library_add</i>
                            </NavLink> : '' : ''
                        }
                    </h3> : ''
                }
                <div className={Styles.loading}></div>
            </>
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

        if (found === false) {
            return (
                <div className={Styles.warning}><i className={`material-icons ${Styles.icon}`}>error</i></div>
            )
        }
    }
    return (
        <div className={Styles.block}>
            <h3 className={Styles.heading}>
                Финансы
                {
                    admin ?
                    admin.length > 1 ? 
                    <NavLink activeClassName={Styles.active} to={`/panel/analytics/create`}>
                        <i className={`material-icons ${Styles.create}`}>library_add</i>
                    </NavLink> : '' : ''
                }
            </h3>
            <div className={Styles.block}>
                <div className={Styles.wrapper}>
                    <table cellPadding="7" border="1" bordercolor="#304269" className={Styles.table}>
                        <caption>Приходящие транзакции</caption>
                        <thead>
                            <tr><th>Категория</th><th>Описание</th><th>Сумма</th><th>Дата</th><th></th></tr>
                        </thead>
                        <tbody>
                            {
                                incomeData ?
                                incomeData.map(({ id, category, description, value, date }, i) => {
                                    return (
                                        <tr key={ i }>
                                            <td>{ category }</td>
                                            <td>{ description }</td>
                                            <td>{ value }</td>
                                            <td width="1%">{ date }</td>
                                            <td width="1%">
                                                <button className={Styles.deleteButton} type="submit" onClick={() => {deleteHandler('/admin/finance/deleteIncome', id)}}><i className={`material-icons ${Styles.delete}`}>delete</i></button>
                                            </td>
                                        </tr>
                                    )
                                }) : null
                            }
                        </tbody>
                    </table>
                </div>
                <div className={Styles.wrapper}>
                    <table cellPadding="7" border="1" bordercolor="#304269" className={Styles.table}>
                        <caption>Уходящие транзакции</caption>
                        <thead>
                            <tr><th>Категория</th><th>Описание</th><th>Сумма</th><th>Дата</th><th></th></tr>
                        </thead>
                        <tbody>
                            {
                                expensesData ?
                                expensesData.map(({ id, category, description, value, date }, i) => {
                                    return (
                                        <tr key={ i }>
                                            <td>{ category }</td>
                                            <td>{ description }</td>
                                            <td>{ value }</td>
                                            <td width="1%">{ date }</td>
                                            <td width="1%">
                                                <button className={Styles.deleteButton} type="submit" onClick={() => {deleteHandler('/admin/finance/deleteExpense', id)}}><i className={`material-icons ${Styles.delete}`}>delete</i></button>
                                            </td>
                                        </tr>
                                    )
                                }) : null
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            <Export tableData={toExcel} fileName="realization" />
        </div>
    )
}