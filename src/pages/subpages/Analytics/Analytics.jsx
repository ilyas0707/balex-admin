import React, { useState } from 'react'
import { NavLink } from 'react-router-dom';
import { Export } from '../../../components/Export/Export';
import { useAnalytics } from '../../../hooks/analytics.hook';
import { useGet } from '../../../hooks/get.hook';
import { useDelete } from '../../../hooks/delete.hook';
import { useSortByDate } from '../../../hooks/sortByDate.hook';
import ReactPaginate from "react-paginate"
import Styles from './Analytics.module.css'

const PER_PAGE = 5

export const Analytics = () => {
    const { data, loading, admin } = useGet('/admin/finance/getThisMonthSections')
    const { deleteHandler } = useDelete('analytics')
    const { sortByDate } = useSortByDate()
    const { stoneIncomeData, realizationData, incomeData, expensesData, stoneIncomeSum, totalSumSOM, totalSumUSD, totalSumEUR, totalIncomeSumSOM, totalIncomeSumUSD, totalIncomeSumEUR, totalExpensesSumSOM, totalExpensesSumUSD, totalExpensesSumEUR } = useAnalytics(data.stoneIncome, data.realization, data.income, data.expense)
    const total = []
    const toExcel = total.concat(
        {'#': 'Приход камня'}, stoneIncomeData,
        {
            'Итого': `${stoneIncomeSum.reduce((a, b) => a + b, 0)} сом`
        },
        {'#': 'Реализация камня'}, realizationData, 
        {
            'Итого': `${totalSumSOM.reduce((a, b) => a + b, 0)} сом, ${totalSumUSD.reduce((a, b) => a + b, 0)} $, ${totalSumEUR.reduce((a, b) => a + b, 0)} €`
        },
        {'#': 'Приходящие транзакции'}, incomeData, 
        {
            'Итого': `${totalIncomeSumSOM.reduce((a, b) => a + b, 0)} сом, ${totalIncomeSumUSD.reduce((a, b) => a + b, 0)} $, ${totalIncomeSumEUR.reduce((a, b) => a + b, 0)} €`
        },
        {'#': 'Уходящие транзакции'}, expensesData,
        {
            'Итого': `${totalExpensesSumSOM.reduce((a, b) => a + b, 0)} сом, ${totalExpensesSumUSD.reduce((a, b) => a + b, 0)} $, ${totalExpensesSumEUR.reduce((a, b) => a + b, 0)} €`
        }
    )
    const [stoneIncomeCurrentPage, setStoneIncomeCurrentPage] = useState(0)
    const [realizationCurrentPage, setRealizationCurrentPage] = useState(0)
    const [incomeCurrentPage, setIncomeCurrentPage] = useState(0)
    const [expensesCurrentPage, setExpensesCurrentPage] = useState(0)

    function stoneIncomePageClick({ selected: selectedPage }) {
        setStoneIncomeCurrentPage(selectedPage)
    }
    function realizationPageClick({ selected: selectedPage }) {
        setRealizationCurrentPage(selectedPage)
    }
    function incomePageClick({ selected: selectedPage }) {
        setIncomeCurrentPage(selectedPage)
    }
    function expensesPageClick({ selected: selectedPage }) {
        setExpensesCurrentPage(selectedPage)
    }

    const stoneIncomeOffset = stoneIncomeCurrentPage * PER_PAGE
    const realizationOffset = realizationCurrentPage * PER_PAGE
    const incomeOffset = incomeCurrentPage * PER_PAGE
    const expensesOffset = expensesCurrentPage * PER_PAGE

    const stoneIncomePageCount = Math.ceil(stoneIncomeData ? stoneIncomeData.length / PER_PAGE : 0)
    const realizationPageCount = Math.ceil(realizationData ? realizationData.length / PER_PAGE : 0)
    const incomePageCount = Math.ceil(incomeData ? incomeData.length / PER_PAGE : 0)
    const expensesPageCount = Math.ceil(expensesData ? expensesData.length / PER_PAGE : 0)

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
                    <table cellPadding="10" border="0" bordercolor="#304269" className={Styles.table}>
                        <caption>Приход камня</caption>
                        <thead>
                            <tr><th>Дата</th><th>Категория</th><th>Описание</th><th>Сумма</th><th></th></tr>
                        </thead>
                        <tbody>
                            {
                                stoneIncomeData ?
                                stoneIncomeData.sort(sortByDate).slice(stoneIncomeOffset, stoneIncomeOffset + PER_PAGE).map(({ id, category, description, value, date }, i) => {
                                    return (
                                        <tr key={ i }>
                                            <td width="1%">{ date }</td>
                                            <td>{ category }</td>
                                            <td>{ description }</td>
                                            <td>{ `${value.toFixed(1)} сом` }</td>
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
                <ReactPaginate
                    previousLabel={"Previous"}
                    nextLabel={"Next"}
                    pageCount={stoneIncomePageCount}
                    onPageChange={stoneIncomePageClick}
                    containerClassName={"pagination"}
                    previousLinkClassName={"pagination__link"}
                    nextLinkClassName={"pagination__link"}
                    disabledClassName={"pagination__link--disabled"}
                    activeClassName={"pagination__link--active"}
                />
                <div style={{marginBottom: '20px'}}>
                    <p className={Styles.label}>Итого: <span className={Styles.span}>{ `${(stoneIncomeSum.reduce((a, b) => a + b, 0)).toFixed(1)} сом` }</span></p>
                </div>
                <div className={Styles.wrapper}>
                    <table cellPadding="10" border="0" bordercolor="#304269" className={Styles.table}>
                        <caption>Реализация камня</caption>
                        <thead>
                            <tr><th>Дата</th><th>Категория</th><th>Описание</th><th>Сумма</th><th></th></tr>
                        </thead>
                        <tbody>
                            {
                                realizationData ?
                                realizationData.sort(sortByDate).slice(realizationOffset, realizationOffset + PER_PAGE).map(({ id, category, description, value, currency, date }, i) => {
                                    return (
                                        <tr key={ i }>
                                            <td width="1%">{ date }</td>
                                            <td>{ category }</td>
                                            <td>{ description }</td>
                                            <td>{ `${value.toFixed(1)} ${currency === 'SOM' ? 'сом' : currency === 'USD' ? '$' : currency === 'EUR' ? '€' : ''}` }</td>
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
                <ReactPaginate
                    previousLabel={"Previous"}
                    nextLabel={"Next"}
                    pageCount={realizationPageCount}
                    onPageChange={realizationPageClick}
                    containerClassName={"pagination"}
                    previousLinkClassName={"pagination__link"}
                    nextLinkClassName={"pagination__link"}
                    disabledClassName={"pagination__link--disabled"}
                    activeClassName={"pagination__link--active"}
                />
                <div style={{marginBottom: '20px'}}>
                    <p className={Styles.label}>Итого: <span className={Styles.span}>{ `${(totalSumSOM.reduce((a, b) => a + b, 0)).toFixed(1)} сом, ${(totalSumUSD.reduce((a, b) => a + b, 0)).toFixed(1)} $, ${(totalSumEUR.reduce((a, b) => a + b, 0)).toFixed(1)} €` }</span></p>
                </div>
                <div className={Styles.wrapper}>
                    <table cellPadding="10" border="0" bordercolor="#304269" className={Styles.table}>
                        <caption>Приходящие транзакции</caption>
                        <thead>
                            <tr><th>Дата</th><th>Категория</th><th>Описание</th><th>Сумма</th><th></th></tr>
                        </thead>
                        <tbody>
                            {
                                incomeData ?
                                incomeData.sort(sortByDate).slice(incomeOffset, incomeOffset + PER_PAGE).map(({ id, category, description, value, currency, date }, i) => {
                                    return (
                                        <tr key={ i }>
                                            <td width="1%">{ date }</td>
                                            <td>{ category }</td>
                                            <td>{ description }</td>
                                            <td>{ `${value.toFixed(1)} ${currency === 'SOM' ? 'сом' : currency === 'USD' ? '$' : currency === 'EUR' ? '€' : ''}` }</td>
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
                <ReactPaginate
                    previousLabel={"Previous"}
                    nextLabel={"Next"}
                    pageCount={incomePageCount}
                    onPageChange={incomePageClick}
                    containerClassName={"pagination"}
                    previousLinkClassName={"pagination__link"}
                    nextLinkClassName={"pagination__link"}
                    disabledClassName={"pagination__link--disabled"}
                    activeClassName={"pagination__link--active"}
                />
                <div style={{marginBottom: '20px'}}>
                    <p className={Styles.label}>Итого: <span className={Styles.span}>{ `${(totalIncomeSumSOM.reduce((a, b) => a + b, 0)).toFixed(1)} сом, ${(totalIncomeSumUSD.reduce((a, b) => a + b, 0)).toFixed(1)} $, ${(totalIncomeSumEUR.reduce((a, b) => a + b, 0)).toFixed(1)} €` }</span></p>
                </div>
                <div className={Styles.wrapper}>
                    <table cellPadding="10" border="0" bordercolor="#304269" className={Styles.table}>
                        <caption>Уходящие транзакции</caption>
                        <thead>
                            <tr><th>Дата</th><th>Категория</th><th>Описание</th><th>Сумма</th><th></th></tr>
                        </thead>
                        <tbody>
                            {
                                expensesData ?
                                expensesData.sort(sortByDate).slice(expensesOffset, expensesOffset + PER_PAGE).map(({ id, category, description, value, currency, date }, i) => {
                                    return (
                                        <tr key={ i }>
                                            <td width="1%">{ date }</td>
                                            <td>{ category }</td>
                                            <td>{ description }</td>
                                            <td>{ `${value.toFixed(1)} ${currency === 'SOM' ? 'сом' : currency === 'USD' ? '$' : currency === 'EUR' ? '€' : ''}` }</td>
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
                <ReactPaginate
                    previousLabel={"Previous"}
                    nextLabel={"Next"}
                    pageCount={expensesPageCount}
                    onPageChange={expensesPageClick}
                    containerClassName={"pagination"}
                    previousLinkClassName={"pagination__link"}
                    nextLinkClassName={"pagination__link"}
                    disabledClassName={"pagination__link--disabled"}
                    activeClassName={"pagination__link--active"}
                />
                <div style={{marginBottom: '20px'}}>
                    <p className={Styles.label}>Итого: <span className={Styles.span}>{ `${(totalExpensesSumSOM.reduce((a, b) => a + b, 0)).toFixed(1)} сом, ${(totalExpensesSumUSD.reduce((a, b) => a + b, 0)).toFixed(1)} $, ${(totalExpensesSumEUR.reduce((a, b) => a + b, 0)).toFixed(1)} €` }</span></p>
                </div>
            </div>
            <Export tableData={toExcel} fileName="finances" />
        </div>
    )
}