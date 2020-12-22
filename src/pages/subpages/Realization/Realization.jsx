import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Export } from '../../../components/Export/Export'
import { useGet } from '../../../hooks/get.hook'
import { useDelete } from '../../../hooks/delete.hook'
import { useRealization } from '../../../hooks/realization.hook'
import { useSortByDate } from '../../../hooks/sortByDate.hook'
import ReactPaginate from "react-paginate"
import Styles from './Realization.module.css'

const PER_PAGE = 5

export const Realization = () => {
    const { data, loading, admin } = useGet('/api/realization/getAllSections')
    const { deleteHandler } = useDelete('realization')
    const { sortByDate } = useSortByDate()
    const { realizationData, remainderData, realizationSum1, realizationSum2, totalSumSOM, totalSumUSD, totalSumEUR, paidSumSOM, paidSumUSD, paidSumEUR } = useRealization(data.realization, data.remainder)
    const total = []
    const toExcel = total.concat(
        {'#': 'Реализация'}, realizationData,
        {
            'Итого 1 слой': realizationSum1.reduce((a, b) => a + b, 0),
            'Итого 2 слой': realizationSum2.reduce((a, b) => a + b, 0),
            'Итого по слоям': realizationSum1.reduce((a, b) => a + b, 0) + realizationSum2.reduce((a, b) => a + b, 0),
            'Итого': `${totalSumSOM.reduce((a, b) => a + b, 0)} сом, ${totalSumUSD.reduce((a, b) => a + b, 0)} $, ${totalSumEUR.reduce((a, b) => a + b, 0)} €`,
            'Итого оплачено': `${paidSumSOM.reduce((a, b) => a + b, 0)} сом, ${paidSumUSD.reduce((a, b) => a + b, 0)} $, ${paidSumEUR.reduce((a, b) => a + b, 0)} €`
        },
        {'#': 'Остаток'}, remainderData
    )
    const [currentPage, setCurrentPage] = useState(0)

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

    function handlePageClick({ selected: selectedPage }) {
        setCurrentPage(selectedPage)
    }

    const offset = currentPage * PER_PAGE
    const pageCount = Math.ceil(realizationData ? realizationData.length / PER_PAGE : 0)

    if (loading) {
        return (
            <>
                <h3 className={Styles.heading}>
                    Реализация
                    {
                        found ? 
                        <NavLink activeClassName={Styles.active} to={`/panel/realization/create`}>
                            <i className={`material-icons ${Styles.create}`}>library_add</i>
                        </NavLink> : ''
                    }
                </h3>
                <div className={Styles.loading}></div>
            </>
        )
    }

    if (admin) {
        // eslint-disable-next-line
        var found = false
        // eslint-disable-next-line
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
        <div className={Styles.realization}>
            <h3 className={Styles.heading}>
                Реализация
                {
                    found ? 
                    <NavLink activeClassName={Styles.active} to={`/panel/realization/create`}>
                        <i className={`material-icons ${Styles.create}`}>library_add</i>
                    </NavLink> : ''
                }
            </h3>
            <div className={Styles.block}>
                <div className={Styles.wrapper}>
                    <table cellPadding="10" border="0" bordercolor="#304269" className={Styles.table}>
                        <caption>Реализация</caption>
                        <thead>
                            <tr><th>Дата</th><th>Клиент</th><th>Номер партии</th><th>Слой</th><th>Размеры</th><th>Площадь</th><th>Цена(m2)</th><th>Итого</th><th>Оплачено</th><th>Остаток</th><th>Дата оплаты</th><th>Метод оплаты</th>{found ? <th></th> : null}</tr>
                        </thead>
                        <tbody>
                            {
                                realizationData ?
                                realizationData.sort(sortByDate).slice(offset, offset + PER_PAGE).map(({ id, clientName, orderNumber, layer, dimension, square, pricePerSquare, total, pricePaid, currency, statusPaid, date, datePaid, remainder, paymentType }, i) => {
                                    return (
                                        <tr key={ i } className={statusPaid === 1 ? Styles.paid : ''}>
                                            <td width="1%">{ date }</td>
                                            <td>{ clientName }</td>
                                            <td>{ orderNumber }</td>
                                            <td>{ layer }</td>
                                            <td>{ dimension }</td>
                                            <td>{ `${square.toFixed(1)} m2` }</td>
                                            <td>{ `${pricePerSquare.toFixed(1)} ${currency === 'SOM' ? 'сом' : currency === 'USD' ? '$' : currency === 'EUR' ? '€' : ''}` }</td>
                                            <td>{ `${total.toFixed(1)} ${currency === 'SOM' ? 'сом' : currency === 'USD' ? '$' : currency === 'EUR' ? '€' : ''}` }</td>
                                            <td>{ `${pricePaid === null ? '0.0' : pricePaid.toFixed(1)} ${currency === 'SOM' ? 'сом' : currency === 'USD' ? '$' : currency === 'EUR' ? '€' : ''}` }</td>
                                            <td>{ `${remainder.toFixed(1)} ${currency === 'SOM' ? 'сом' : currency === 'USD' ? '$' : currency === 'EUR' ? '€' : ''}` }</td>
                                            <td width="1%">{ datePaid }</td>
                                            <td width="1%">{ paymentType === 'BANK' ? 'Банк' : paymentType === 'CASH' ? 'Наличными' : '' }</td>
                                            {
                                                found ?
                                                <td width="1%">
                                                    <button className={Styles.deleteButton} type="submit" onClick={() => {deleteHandler('/api/realization/delete', id)}}><i className={`material-icons ${Styles.delete}`}>delete</i></button>
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
                    pageCount={pageCount}
                    onPageChange={handlePageClick}
                    containerClassName={"pagination"}
                    previousLinkClassName={"pagination__link"}
                    nextLinkClassName={"pagination__link"}
                    disabledClassName={"pagination__link--disabled"}
                    activeClassName={"pagination__link--active"}
                />
                <div style={{marginBottom: '20px'}}>
                    <p className={Styles.label}>Итого 1 слой: <span className={Styles.span}>{ `${(realizationSum1.reduce((a, b) => a + b, 0)).toFixed(1)} m2` }</span></p>
                    <p className={Styles.label}>Итого 2 слой: <span className={Styles.span}>{ `${(realizationSum2.reduce((a, b) => a + b, 0)).toFixed(1)} m2` }</span></p>
                    <p className={Styles.label}>Итого по слоям: <span className={Styles.span}>{ `${(realizationSum1.reduce((a, b) => a + b, 0) + realizationSum2.reduce((a, b) => a + b, 0)).toFixed(1)} m2` }</span></p>
                    <p className={Styles.label}>Итого: <span className={Styles.span}>{ `${(totalSumSOM.reduce((a, b) => a + b, 0)).toFixed(1)} сом, ${(totalSumUSD.reduce((a, b) => a + b, 0)).toFixed(1)} $, ${(totalSumEUR.reduce((a, b) => a + b, 0)).toFixed(1)} €` }</span></p>
                    <p className={Styles.label}>Итого оплачено: <span className={Styles.span}>{ `${(paidSumSOM.reduce((a, b) => a + b, 0)).toFixed(1)} сом, ${(paidSumUSD.reduce((a, b) => a + b, 0)).toFixed(1)} $, ${(paidSumEUR.reduce((a, b) => a + b, 0)).toFixed(1)} €` }</span></p>
                </div>
                <div className={Styles.wrapper}>
                    <table cellPadding="12" border="0" bordercolor="#304269" className={Styles.table}>
                        <caption>Остаток</caption>
                        <thead>
                            <tr><th>Слой</th><th>Размеры</th><th>Объём</th></tr>
                        </thead>
                        <tbody>
                            {
                                remainderData ?
                                remainderData.map(({ layer, size, volume }, i) => {
                                    return (
                                        <tr key={ i }>
                                            <td>{ layer }</td>
                                            <td>{ size }</td>
                                            <td>{ `${volume} m2` }</td>
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