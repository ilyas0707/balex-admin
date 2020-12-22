import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Export } from '../../../components/Export/Export'
import { useGet } from '../../../hooks/get.hook'
import { useSort } from '../../../hooks/sort.hook'
import { useSortByDate } from '../../../hooks/sortByDate.hook'
import { useIncome } from '../../../hooks/income.hook'
import ReactPaginate from "react-paginate"
import Styles from './IncomeAccounting.module.css'

const PER_PAGE = 5

export const IncomeAccounting = () => {
    const { data, loading, admin } = useGet('/api/stoneIncome/getAllSections')
    const { sortByStatus } = useSort()
    const { sortByDate } = useSortByDate()
    const { incomeData, pricePaidSum } = useIncome(data.income)
    let total = []
    const toExcel = total.concat(
        {'#': 'Приходы'}, incomeData,
        {
            'Итого оплачено': pricePaidSum.reduce((a, b) => a + b, 0),
        },
    )
    const [currentPage, setCurrentPage] = useState(0)

    if (admin) {
        var found = false
        for(var i = 0; i < admin.length; i++) {
            if (admin[i].role === 'ROLE_ADMIN' || admin[i].role === 'ROLE_ACCOUNTANT') {
                found = true
                break
            } else {
                found = false
            }
        }

        var show = false
        // eslint-disable-next-line
        for(var i = 0; i < admin.length; i++) {
            if (admin[i].role === 'ROLE_ACCOUNTANT') {
                show = true
                break
            } else {
                show = false
            }
        }
    }

    function handlePageClick({ selected: selectedPage }) {
        setCurrentPage(selectedPage)
    }

    const offset = currentPage * PER_PAGE
    const pageCount = Math.ceil(incomeData ? incomeData.length / PER_PAGE : 0)

    if (loading) {
        return (
            <>
                {
                    admin ?
                    admin.length === 1 ?
                    '' :
                    <h3 className={Styles.heading}>
                        Приход <br/> (Бухгалтер)
                        {
                            show ?
                            <NavLink activeClassName={Styles.active} to={`/panel/incomeAccounting/create`}>
                                <i className={`material-icons ${Styles.create}`}>library_add</i>
                            </NavLink> : ''
                        }
                    </h3> : ''
                }
                <div className={Styles.loading}></div>
            </>
        )
    }
    if (admin) {
        if (found === false) {
            return (
                <div className={Styles.warning}><i className={`material-icons ${Styles.icon}`}>error</i></div>
            )
        }
    }
    return (
        <div className={Styles.income}>
            <h3 className={Styles.heading}>
                Приход <br/> (Бухгалтер)
                {
                    show ?
                    <NavLink activeClassName={Styles.active} to={`/panel/incomeAccounting/create`}>
                        <i className={`material-icons ${Styles.create}`}>library_add</i>
                    </NavLink> : ''
                }
            </h3>
            <div className={Styles.block}>
                <div className={Styles.wrapper}>
                    <table cellPadding="12" border="0" bordercolor="#304269" className={Styles.table}>
                        <caption>Приходы</caption>
                        <thead>
                            <tr><th>Дата</th><th>Накладная</th><th>ФИО</th><th>Гос.номер</th><th>Слой</th><th>Объём</th><th>Цена(m3)</th><th>Итого</th><th>Оплачено</th><th>Остаток</th></tr>
                        </thead>
                        <tbody>
                            {
                                incomeData ?
                                incomeData.sort(sortByDate).sort(sortByStatus).slice(offset, offset + PER_PAGE).map(({ billNumber, driverName, carNumber, layer, volume, pricePerCube, total, pricePaid, statusPaid, date, remainder }, i) => {
                                    return (
                                        <tr key={ i } className={statusPaid === 1 ? Styles.paid : ''}>
                                            <td width="1%">{ date }</td>
                                            <td>{ billNumber }</td>
                                            <td>{ driverName }</td>
                                            <td>{ carNumber }</td>
                                            <td>{ layer }</td>
                                            <td>{ `${volume} m3` }</td>
                                            <td>{ `${pricePerCube} сом` }</td>
                                            <td>{ `${total.toFixed(1)} сом` }</td>
                                            <td>{ `${pricePaid === null ? '0.0' : pricePaid.toFixed(1)} сом` }</td>
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
                    pageCount={pageCount}
                    onPageChange={handlePageClick}
                    containerClassName={"pagination"}
                    previousLinkClassName={"pagination__link"}
                    nextLinkClassName={"pagination__link"}
                    disabledClassName={"pagination__link--disabled"}
                    activeClassName={"pagination__link--active"}
                />
                <div style={{marginBottom: '20px'}}>
                    <p className={Styles.label}>Итого оплачено: <span className={Styles.span}>{ `${(pricePaidSum.reduce((a, b) => a + b, 0)).toFixed(1)} сом` }</span></p>
                </div>
            </div>
            {
                data.income && data.outcome && data.remainder ?
                <Export tableData={toExcel} fileName="incomeAccounting" /> : ''
            }
        </div>
    )
}