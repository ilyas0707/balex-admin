import React, { useState } from 'react'
// import { NavLink } from 'react-router-dom'
import { useGet } from '../../../hooks/get.hook'
import { useDelete } from '../../../hooks/delete.hook'
import { useOrder } from '../../../hooks/order.hook'
import { useSortByDate } from '../../../hooks/sortByDate.hook'
import ReactPaginate from "react-paginate"
import Styles from './Order.module.css'
import './Pagination.css'

const PER_PAGE = 10

export const Order = () => {
    const { data, loading } = useGet('/api/order/getAll')
    const { deleteHandler } = useDelete('orders')
    const { sortByDate } = useSortByDate()
    const { orderData } = useOrder(data.object)

    const [orderCurrentPage, setOrderCurrentPage] = useState(0)
    const [status, setStatus] = useState('ALL')

    function orderPageClick({ selected: selectedPage }) {
        setOrderCurrentPage(selectedPage)
    }

    const selectHandler = (event) => {
        setStatus(event.target.value)
    }

    const orderOffset = orderCurrentPage * PER_PAGE
    const orderPageCount = Math.ceil(orderData ? orderData.length / PER_PAGE : 0)

    if (loading) {
        return (
            <>
                <h3 className={Styles.heading}>
                    Заказы
                </h3>
                <div className={Styles.loading}></div>
            </>
        )
    }
    return (
        <div className={Styles.income}>
            <h3 className={Styles.heading}>
                Заказы
                <div className={Styles.relative}>
                    <select className={Styles.select} name="status" id="status" onChange={selectHandler}>
                        <option value="ALL">Все</option>
                        <option value="AWAITING_CONFIRMATION">Ожидает подтверждения</option>
                        <option value="CONFIRMED">Подтверждён</option>
                        <option value="IN_FLIGHT">В пути</option>
                        <option value="DELIVERED">Доставлен</option>
                        <option value="COMPLETED">Принят</option>
                    </select>
                    <i className={`material-icons ${Styles.icon}`}>play_arrow</i>
                </div>
                {/* <NavLink activeClassName={Styles.active} to={`/panel/orders/create`}>
                    <i className={`material-icons ${Styles.create}`}>library_add</i>
                </NavLink> */}
            </h3>
            <div className={Styles.block}>
                <div className={Styles.wrapper}>
                    <table cellPadding="10" border="0" bordercolor="#304269" className={Styles.table}>
                        <thead>
                            <tr><th>Дата</th><th>Описание</th><th>Гос. номер</th><th>Объём</th><th>Стоимость</th><th>Клиент</th><th>Статус</th><th>Итого</th><th></th></tr>
                        </thead>
                        <tbody>
                            {
                                orderData ?
                                orderData.filter(el => status === 'ALL' ? el : el.status === status).sort(sortByDate).slice(orderOffset, orderOffset + PER_PAGE).map(({ id, description, priceFromInvoice, total, trackNumber, volume, volumeUnit, user, date, status }, i) => {
                                    return (
                                        <tr key={ i }>
                                            <td width="1%">{ date }</td>
                                            <td>{ description }</td>
                                            <td>{ trackNumber }</td>
                                            <td>{ `${volume} ${volumeUnit}` }</td>
                                            <td>{ priceFromInvoice }</td>
                                            <td>{ user.name } { user.surName }</td>
                                            <td>
                                                {
                                                    status === 'AWAITING_CONFIRMATION' ? 'Ожидает подтверждения' : 
                                                    status === 'CONFIRMED' ? 'Подтверждён' :
                                                    status === 'IN_FLIGHT' ? 'В пути' :
                                                    status === 'DELIVERED' ? 'Доставлен' :
                                                    status === 'COMPLETED' ? 'Принят' : '---'
                                                }
                                            </td>
                                            {/* <td>{ `${user.name !== null ? user.name : ''} ${user.surName !== null ? user.surName : ''}` }</td> */}
                                            <td>{ total }</td>
                                            <td width="1%">
                                                <button className={Styles.deleteButton} type="submit" onClick={() => {deleteHandler('/api/order/delete', id)}}><i className={`material-icons ${Styles.delete}`}>delete</i></button>
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
                    pageCount={orderPageCount}
                    onPageChange={orderPageClick}
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