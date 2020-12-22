import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Export } from '../../../components/Export/Export'
import { useGet } from '../../../hooks/get.hook'
import { useDelete } from '../../../hooks/delete.hook'
import { useIncome } from '../../../hooks/income.hook'
import { useSortByDate } from '../../../hooks/sortByDate.hook'
import ReactPaginate from "react-paginate"
import Styles from './Income.module.css'
import './Pagination.css'

const PER_PAGE = 5

export const Income = () => {
    const { data, loading, admin } = useGet('/api/stoneIncome/getAllSections')
    const { deleteHandler } = useDelete('income')
    const { sortByDate } = useSortByDate()
    const { incomeData, outcomeData, remainderData, incomeSum1, incomeSum2, totalSum, outcomeSum1, outcomeSum2 } = useIncome(data.income, data.outcome, data.remainder)
    let total = []
    const toExcel = total.concat(
        {'#': 'Приходы'}, incomeData,
        {
            'Итого 1 слой': incomeSum1.reduce((a, b) => a + b, 0),
            'Итого 2 слой': incomeSum2.reduce((a, b) => a + b, 0),
            'Итого по слоям': incomeSum1.reduce((a, b) => a + b, 0) + incomeSum2.reduce((a, b) => a + b, 0),
            'Итого': totalSum.reduce((a, b) => a + b, 0)
        },
        {'#': 'Расходы'}, outcomeData,
        {
            'Итого 1 слой': outcomeSum1.reduce((a, b) => a + b, 0),
            'Итого 2 слой': outcomeSum2.reduce((a, b) => a + b, 0),
            'Итого по слоям': outcomeSum1.reduce((a, b) => a + b, 0) + outcomeSum2.reduce((a, b) => a + b, 0)
        },
        {'#': 'Остаток'}, remainderData
    )
    const [incomeCurrentPage, setIncomeCurrentPage] = useState(0)
    const [outcomeCurrentPage, setOncomeCurrentPage] = useState(0)

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

    function incomePageClick({ selected: selectedPage }) {
        setIncomeCurrentPage(selectedPage)
    }

    function outcomePageClick({ selected: selectedPage }) {
        setOncomeCurrentPage(selectedPage)
    }

    const incomeOffset = incomeCurrentPage * PER_PAGE
    const outcomeOffset = outcomeCurrentPage * PER_PAGE
    const incomePageCount = Math.ceil(incomeData ? incomeData.length / PER_PAGE : 0)
    const outcomePageCount = Math.ceil(outcomeData ? outcomeData.length / PER_PAGE : 0)

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
                    <table cellPadding="10" border="0" bordercolor="#304269" className={Styles.table}>
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
                            <tr><th>Дата</th><th>Накладная</th><th>ФИО</th><th>Гос.номер</th><th>Слой</th><th>Объём</th><th>Цена(m3)</th><th>Итого</th>{found ? <th></th> : null}</tr>
                        </thead>
                        <tbody>
                            {
                                incomeData ?
                                incomeData.sort(sortByDate).slice(incomeOffset, incomeOffset + PER_PAGE).map(({ id, billNumber, driverName, carNumber, layer, volume, pricePerCube, total, date }, i) => {
                                    return (
                                        <tr key={ i }>
                                            <td width="1%">{ date }</td>
                                            <td>{ billNumber }</td>
                                            <td>{ driverName }</td>
                                            <td>{ carNumber }</td>
                                            <td>{ layer }</td>
                                            <td>{ `${volume} m3` }</td>
                                            <td>{ `${pricePerCube} сом` }</td>
                                            <td>{ `${total} сом` }</td>
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
                    <p className={Styles.label}>Итого 1 слой: <span className={Styles.span}>{ `${(incomeSum1.reduce((a, b) => a + b, 0)).toFixed(1)} m3` }</span></p>
                    <p className={Styles.label}>Итого 2 слой: <span className={Styles.span}>{ `${(incomeSum2.reduce((a, b) => a + b, 0)).toFixed(1)} m3` }</span></p>
                    <p className={Styles.label}>Итого по слоям: <span className={Styles.span}>{ `${(incomeSum1.reduce((a, b) => a + b, 0) + incomeSum2.reduce((a, b) => a + b, 0)).toFixed(1)} m3` }</span></p>
                    <p className={Styles.label}>Итого: <span className={Styles.span}>{ `${(totalSum.reduce((a, b) => a + b, 0)).toFixed(1)} сом` }</span></p>
                </div>
                <div className={Styles.wrapper}>
                    <table cellPadding="10" border="0" bordercolor="#304269" className={Styles.table}>
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
                            <tr><th>Дата</th><th>Станок</th><th>Слой</th><th>Объём</th>{found ? <th></th> : null}</tr>
                        </thead>
                        <tbody>
                            {
                                outcomeData ?
                                outcomeData.sort(sortByDate).slice(outcomeOffset, outcomeOffset + PER_PAGE).map(({ id, layer, stoneMachine, stoneVolume, date }, i) => {
                                    return (
                                        <tr key={ i }>
                                            <td width="1%">{ date }</td>
                                            <td>{ stoneMachine }</td>
                                            <td>{ layer }</td>
                                            <td>{ `${stoneVolume} m3` }</td>
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
                <ReactPaginate
                    previousLabel={"Previous"}
                    nextLabel={"Next"}
                    pageCount={outcomePageCount}
                    onPageChange={outcomePageClick}
                    containerClassName={"pagination"}
                    previousLinkClassName={"pagination__link"}
                    nextLinkClassName={"pagination__link"}
                    disabledClassName={"pagination__link--disabled"}
                    activeClassName={"pagination__link--active"}
                />
                <div style={{marginBottom: '20px'}}>
                    <p className={Styles.label}>Итого 1 слой: <span className={Styles.span}>{ `${(outcomeSum1.reduce((a, b) => a + b, 0)).toFixed(1)} m3` }</span></p>
                    <p className={Styles.label}>Итого 2 слой: <span className={Styles.span}>{ `${(outcomeSum2.reduce((a, b) => a + b, 0)).toFixed(1)} m3` }</span></p>
                    <p className={Styles.label}>Итого по слоям: <span className={Styles.span}>{ `${(outcomeSum1.reduce((a, b) => a + b, 0) + outcomeSum2.reduce((a, b) => a + b, 0)).toFixed(1)} m3` }</span></p>
                </div>
                <div className={Styles.wrapper}>
                    <table cellPadding="12" border="0" bordercolor="#304269" className={Styles.table}>
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
                                            <td>{ `${volume} m3` }</td>
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