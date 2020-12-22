import React, { useState } from 'react'
import { useSortByDate } from '../../hooks/sortByDate.hook'
import ReactPaginate from "react-paginate"
import Styles from './AllSections.module.css'

const PER_PAGE = 5

export const AllSections = ({ data }) => {
    const { sortByDate } = useSortByDate()

    const [incomeCurrentPage, setIncomeCurrentPage] = useState(0)
    const [outcomeCurrentPage, setOutcomeCurrentPage] = useState(0)
    const [manCurrentPage, setManCurrentPage] = useState(0)
    const [realCurrentPage, setRealCurrentPage] = useState(0)
    const [incomesCurrentPage, setIncomesCurrentPage] = useState(0)
    const [expensesCurrentPage, setExpensesCurrentPage] = useState(0)

    function incomePageClick({ selected: selectedPage }) {
        setIncomeCurrentPage(selectedPage)
    }

    function outcomePageClick({ selected: selectedPage }) {
        setOutcomeCurrentPage(selectedPage)
    }

    function manPageClick({ selected: selectedPage }) {
        setManCurrentPage(selectedPage)
    }

    function realPageClick({ selected: selectedPage }) {
        setRealCurrentPage(selectedPage)
    }

    function incomesPageClick({ selected: selectedPage }) {
        setIncomesCurrentPage(selectedPage)
    }
    function expensesPageClick({ selected: selectedPage }) {
        setExpensesCurrentPage(selectedPage)
    }

    const incomeOffset = incomeCurrentPage * PER_PAGE
    const outcomeOffset = outcomeCurrentPage * PER_PAGE
    const manOffset = manCurrentPage * PER_PAGE
    const realOffset = realCurrentPage * PER_PAGE
    const incomesOffset = incomesCurrentPage * PER_PAGE
    const expensesOffset = expensesCurrentPage * PER_PAGE
    const incomePageCount = Math.ceil(data[0] ? data[0].length / PER_PAGE : 0)
    const outcomePageCount = Math.ceil(data[1] ? data[1].length / PER_PAGE : 0)
    const manPageCount = Math.ceil(data[2] ? data[2].length / PER_PAGE : 0)
    const realPageCount = Math.ceil(data[3] ? data[3].length / PER_PAGE : 0)
    const incomesPageCount = Math.ceil(data[22] ? data[22].length / PER_PAGE : 0)
    const expensesPageCount = Math.ceil(data[23] ? data[23].length / PER_PAGE : 0)

    let m2m3 = (data[12].reduce((a, b) => a + b, 0) + data[13].reduce((a, b) => a + b, 0)) / (data[10].reduce((a, b) => a + b, 0) + data[11].reduce((a, b) => a + b, 0))

    return (
        <div className={Styles.all}>
            <h3 className={Styles.heading}>
                Все данные
            </h3>
            <div className={Styles.block}>
                <div className={Styles.wrapper}>
                    <table cellPadding="10" border="0" bordercolor="#304269" className={Styles.table}>
                        <caption>
                            Приход
                        </caption>
                        <thead>
                            <tr><th>Дата</th><th>Слой</th><th>Объём</th><th>Цена(m3)</th><th>Итого</th><th>Оплачено</th><th>Остаток</th></tr>
                        </thead>
                        <tbody>
                            {
                                data[0] ?
                                data[0].sort(sortByDate).slice(incomeOffset, incomeOffset + PER_PAGE).map(({ billNumber, driverName, carNumber, layer, volume, pricePerCube, total, pricePaid, statusPaid, date, remainder }, i) => {
                                    return (
                                        <tr key={ i }>
                                            <td width="1%">{ date }</td>
                                            <td>{ layer }</td>
                                            <td>{ `${volume.toFixed(1)} m3` }</td>
                                            <td>{ `${pricePerCube.toFixed(1)} сом` }</td>
                                            <td>{ `${total.toFixed(1)} сом` }</td>
                                            <td>{ `${pricePaid === null ? '0.0' : pricePaid} сом` }</td>
                                            <td>{ `${remainder.toFixed(1)} сом` }</td>
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
                    <p className={Styles.label}>Итого 1 слой: <span className={Styles.span}>{ data[6] ? `${(data[6].reduce((a, b) => a + b, 0)).toFixed(1)} m3` : '' }</span></p>
                    <p className={Styles.label}>Итого 2 слой: <span className={Styles.span}>{ data[7] ? `${(data[7].reduce((a, b) => a + b, 0)).toFixed(1)} m3` : '' }</span></p>
                    <p className={Styles.label}>Итого по слоям: <span className={Styles.span}>{ data[6] && data[7] ? `${(data[6].reduce((a, b) => a + b, 0) + data[7].reduce((a, b) => a + b, 0)).toFixed(1)} m3` : '' }</span></p>
                    <p className={Styles.label}>Итого: <span className={Styles.span}>{ data[8] ? `${(data[8].reduce((a, b) => a + b, 0)).toFixed(1)} сом` : '' }</span></p>
                    <p className={Styles.label}>Итого оплачено: <span className={Styles.span}>{ data[9] ? `${data[9].reduce((a, b) => a + b, 0)} сом` : '' }</span></p>
                </div>
                <div className={Styles.wrapper}>
                    <table cellPadding="10" border="0" bordercolor="#304269" className={Styles.table}>
                        <caption>
                            Расходы
                        </caption>
                        <thead>
                            <tr><th>Дата</th><th>Станок</th><th>Слой</th><th>Объём</th></tr>
                        </thead>
                        <tbody>
                            {
                                data[1] ?
                                data[1].sort(sortByDate).slice(outcomeOffset, outcomeOffset + PER_PAGE).map(({ id, layer, stoneMachine, stoneVolume, date }, i) => {
                                    return (
                                        <tr key={ i }>
                                            <td width="1%">{ date }</td>
                                            <td>{ stoneMachine }</td>
                                            <td>{ layer }</td>
                                            <td>{ `${stoneVolume.toFixed(1)} m3` }</td>
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
                    <p className={Styles.label}>Итого 1 слой: <span className={Styles.span}>{ data[10] ? `${(data[10].reduce((a, b) => a + b, 0)).toFixed(1)} m3` : '' }</span></p>
                    <p className={Styles.label}>Итого 2 слой: <span className={Styles.span}>{ data[11] ? `${(data[11].reduce((a, b) => a + b, 0)).toFixed(1)} m3` : '' }</span></p>
                    <p className={Styles.label}>Итого по слоям: <span className={Styles.span}>{ data[10] && data[11] ? `${(data[10].reduce((a, b) => a + b, 0) + data[11].reduce((a, b) => a + b, 0)).toFixed(1)} m3` : '' }</span></p>
                </div>
                <div className={Styles.wrapper}>
                    <table cellPadding="10" border="0" bordercolor="#304269" className={Styles.table}>
                        <caption>Выработка</caption>
                        <thead>
                            <tr><th>Дата</th><th>Слой</th><th>Размер</th><th>Выработка</th></tr>
                        </thead>
                        <tbody>
                            {
                                data[2] ?
                                data[2].sort(sortByDate).slice(manOffset, manOffset + PER_PAGE).map(({ id, layer, dimension, square, date }, i) => {
                                    return (
                                        <tr key={ i }>
                                            <td width="1%">{ date }</td>
                                            <td>{ layer }</td>
                                            <td>{ dimension }</td>
                                            <td>{ `${square.toFixed(1)} m2` }</td>
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
                    pageCount={manPageCount}
                    onPageChange={manPageClick}
                    containerClassName={"pagination"}
                    previousLinkClassName={"pagination__link"}
                    nextLinkClassName={"pagination__link"}
                    disabledClassName={"pagination__link--disabled"}
                    activeClassName={"pagination__link--active"}
                />
                <div style={{marginBottom: '20px'}}>
                    <p className={Styles.label}>Итого 1 слой: <span className={Styles.span}>{ data[12] ? `${(data[12].reduce((a, b) => a + b, 0)).toFixed(1)} m2` : '' }</span></p>
                    <p className={Styles.label}>Итого 2 слой: <span className={Styles.span}>{ data[13] ? `${(data[13].reduce((a, b) => a + b, 0)).toFixed(1)} m2` : '' }</span></p>
                    <p className={Styles.label}>Итого по слоям: <span className={Styles.span}>{ data[12] && data[13] ? `${(data[12].reduce((a, b) => a + b, 0) + data[13].reduce((a, b) => a + b, 0)).toFixed(1)} m2` : '' }</span></p>
                    <p className={Styles.label}>Итого m2 на 1 m3: <span className={Styles.span}>{ `${m2m3.toFixed(1)} m2/m3` }</span></p>
                </div>
                <div className={Styles.wrapper}>
                    <table cellPadding="10" border="0" bordercolor="#304269" className={Styles.table}>
                        <caption>Реализация</caption>
                        <thead>
                            <tr><th>Дата</th><th>Номер партии</th><th>Слой</th><th>Размеры</th><th>Площадь</th><th>Цена(m2)</th><th>Итого</th><th>Оплачено</th><th>Дата оплаты</th></tr>
                        </thead>
                        <tbody>
                            {
                                data[3] ?
                                data[3].sort(sortByDate).slice(realOffset, realOffset + PER_PAGE).map(({ id, clientName, orderNumber, layer, dimension, square, pricePerSquare, total, pricePaid, currency, statusPaid, date, datePaid, remainder }, i) => {
                                    return (
                                        <tr key={ i } className={statusPaid === 1 ? Styles.paid : ''}>
                                            <td width="1%">{ date }</td>
                                            <td>{ orderNumber }</td>
                                            <td>{ layer }</td>
                                            <td>{ dimension }</td>
                                            <td>{ `${square.toFixed(1)} m2` }</td>
                                            <td>{ `${pricePerSquare.toFixed(1)} ${currency === 'SOM' ? 'сом' : currency === 'USD' ? '$' : currency === 'EUR' ? '€' : ''}` }</td>
                                            <td>{ `${total.toFixed(1)} ${currency === 'SOM' ? 'сом' : currency === 'USD' ? '$' : currency === 'EUR' ? '€' : ''}` }</td>
                                            <td>{ `${pricePaid === null ? '0.0' : pricePaid.toFixed(1)} ${currency === 'SOM' ? 'сом' : currency === 'USD' ? '$' : currency === 'EUR' ? '€' : ''}` }</td>
                                            <td width="1%">{ datePaid }</td>
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
                    pageCount={realPageCount}
                    onPageChange={realPageClick}
                    containerClassName={"pagination"}
                    previousLinkClassName={"pagination__link"}
                    nextLinkClassName={"pagination__link"}
                    disabledClassName={"pagination__link--disabled"}
                    activeClassName={"pagination__link--active"}
                />
                <div style={{marginBottom: '20px'}}>
                    <p className={Styles.label}>Итого 1 слой: <span className={Styles.span}>{ data[14] ? `${(data[14].reduce((a, b) => a + b, 0)).toFixed(1)} m2` : '' }</span></p>
                    <p className={Styles.label}>Итого 2 слой: <span className={Styles.span}>{ data[15] ? `${(data[15].reduce((a, b) => a + b, 0)).toFixed(1)} m2` : '' }</span></p>
                    <p className={Styles.label}>Итого по слоям: <span className={Styles.span}>{ data[14] && data[15] ? `${(data[14].reduce((a, b) => a + b, 0) + data[15].reduce((a, b) => a + b, 0)).toFixed(1)} m2` : '' }</span></p>
                    <p className={Styles.label}>Итого: <span className={Styles.span}>{ data[16] && data[17] && data[18] ? `${(data[16].reduce((a, b) => a + b, 0)).toFixed(1)} сом, ${(data[17].reduce((a, b) => a + b, 0)).toFixed(1)} $, ${(data[18].reduce((a, b) => a + b, 0)).toFixed(1)} €` : '' }</span></p>
                    <p className={Styles.label}>Итого оплачено: <span className={Styles.span}>{ data[19] && data[20] && data[21] ? `${(data[19].reduce((a, b) => a + b, 0)).toFixed(1)} сом, ${(data[20].reduce((a, b) => a + b, 0)).toFixed(1)} $, ${(data[21].reduce((a, b) => a + b, 0)).toFixed(1)} €` : '' }</span></p>
                </div>
                <div className={Styles.wrapper}>
                    <table cellPadding="10" border="0" bordercolor="#304269" className={Styles.table}>
                        <caption>Приходящие транзакции</caption>
                        <thead>
                            <tr><th>Дата</th><th>Категория</th><th>Описание</th><th>Сумма</th></tr>
                        </thead>
                        <tbody>
                            {
                                data[4] ?
                                data[4].sort(sortByDate).slice(incomesOffset, incomesOffset + PER_PAGE).map(({ id, category, description, value, currency, date }, i) => {
                                    return (
                                        <tr key={ i }>
                                            <td width="1%">{ date }</td>
                                            <td>{ category }</td>
                                            <td>{ description }</td>
                                            <td>{ `${value.toFixed(1)} ${currency === 'SOM' ? 'сом' : currency === 'USD' ? '$' : currency === 'EUR' ? '€' : ''}` }</td>
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
                    pageCount={incomesPageCount}
                    onPageChange={incomesPageClick}
                    containerClassName={"pagination"}
                    previousLinkClassName={"pagination__link"}
                    nextLinkClassName={"pagination__link"}
                    disabledClassName={"pagination__link--disabled"}
                    activeClassName={"pagination__link--active"}
                />
                <div style={{marginBottom: '20px'}}>
                    <p className={Styles.label}>Итого: <span className={Styles.span}>{ data[22] && data[23] && data[24] ? `${(data[22].reduce((a, b) => a + b, 0)).toFixed(1)} сом, ${(data[23].reduce((a, b) => a + b, 0)).toFixed(1)} $, ${(data[24].reduce((a, b) => a + b, 0)).toFixed(1)} €` : '' }</span></p>
                </div>
                <div className={Styles.wrapper}>
                    <table cellPadding="10" border="0" bordercolor="#304269" className={Styles.table}>
                        <caption>Уходящие транзакции</caption>
                        <thead>
                            <tr><th>Дата</th><th>Категория</th><th>Описание</th><th>Сумма</th></tr>
                        </thead>
                        <tbody>
                            {
                                data[5] ?
                                data[5].sort(sortByDate).slice(expensesOffset, expensesOffset + PER_PAGE).map(({ id, category, description, value, currency, date }, i) => {
                                    return (
                                        <tr key={ i }>
                                            <td width="1%">{ date }</td>
                                            <td>{ category }</td>
                                            <td>{ description }</td>
                                            <td>{ `${value.toFixed(1)} ${currency === 'SOM' ? 'сом' : currency === 'USD' ? '$' : currency === 'EUR' ? '€' : ''}` }</td>
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
                    <p className={Styles.label}>Итого: <span className={Styles.span}>{ data[25] && data[26] && data[27] ? `${(data[25].reduce((a, b) => a + b, 0)).toFixed(1)} сом, ${(data[26].reduce((a, b) => a + b, 0)).toFixed(1)} $, ${(data[27].reduce((a, b) => a + b, 0)).toFixed(1)} €` : '' }</span></p>
                </div>
            </div>
            {/* {
                data.income && data.outcome && data.remainder ?
                <Export tableData={toExcel} fileName="income" /> : ''
            } */}
        </div>
    )
}
