import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useGet } from '../../../hooks/get.hook'
import { useDelete } from '../../../hooks/delete.hook'
import { useIncome } from '../../../hooks/income.hook'
import { useSortByDate } from '../../../hooks/sortByDate.hook'
import ReactPaginate from "react-paginate"
import Styles from './Income.module.css'
import './Pagination.css'

const PER_PAGE = 10

export const Income = () => {
    const { data, loading } = useGet('/api/income/getAll')
    const { deleteHandler } = useDelete('income')
    const { sortByDate } = useSortByDate()
    const { incomeData } = useIncome(data.object)

    console.log(incomeData)

    const [incomeCurrentPage, setIncomeCurrentPage] = useState(0)


    function incomePageClick({ selected: selectedPage }) {
        setIncomeCurrentPage(selectedPage)
    }

    const incomeOffset = incomeCurrentPage * PER_PAGE
    const incomePageCount = Math.ceil(incomeData ? incomeData.length / PER_PAGE : 0)

    if (loading) {
        return (
            <>
                <h3 className={Styles.heading}>
                    Приходы
                </h3>
                <div className={Styles.loading}></div>
            </>
        )
    }
    return (
        <div className={Styles.income}>
            <h3 className={Styles.heading}>
                Приходы
                <NavLink activeClassName={Styles.active} to={`/panel/income/create`}>
                    <i className={`material-icons ${Styles.create}`}>library_add</i>
                </NavLink>
            </h3>
            <div className={Styles.block}>
                <div className={Styles.wrapper}>
                    <table cellPadding="10" border="0" bordercolor="#304269" className={Styles.table}>
                        <thead>
                            <tr><th>Дата</th><th>Описание</th><th>Сумма</th><th>Метод оплаты</th><th>Клиент</th><th></th></tr>
                        </thead>
                        <tbody>
                            {
                                incomeData ?
                                incomeData.sort(sortByDate).slice(incomeOffset, incomeOffset + PER_PAGE).map(({ id, description, amount, paymentMethod, client, date, sortDate }, i) => {
                                    return (
                                        <tr key={ i }>
                                            <td width="1%">{ date }</td>
                                            <td>{ description }</td>
                                            <td>{ amount }</td>
                                            <td>{ paymentMethod }</td>
                                            <td>{ `${client.name} ${client.surName}` }</td>
                                            <td width="1%">
                                                <button className={Styles.deleteButton} type="submit" onClick={() => {deleteHandler('/api/income/delete', id)}}><i className={`material-icons ${Styles.delete}`}>delete</i></button>
                                            </td>
                                        </tr>
                                    )
                                }) : null
                            }
                        </tbody>
                    </table>
                </div>
                <ReactPaginate
                    previousLabel={"<"}
                    nextLabel={">"}
                    pageCount={incomePageCount}
                    onPageChange={incomePageClick}
                    containerClassName={"pagination"}
                    previousLinkClassName={"pagination__link"}
                    nextLinkClassName={"pagination__link"}
                    disabledClassName={"pagination__link--disabled"}
                    activeClassName={"pagination__link--active"}
                />
            </div>
        </div>
    )
}