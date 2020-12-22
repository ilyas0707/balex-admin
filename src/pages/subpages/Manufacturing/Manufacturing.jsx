import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Export } from '../../../components/Export/Export'
import { useGet } from '../../../hooks/get.hook'
import { useDelete } from '../../../hooks/delete.hook'
import { useManufacturing } from '../../../hooks/manufacturing.hook'
import { useSortByDate } from '../../../hooks/sortByDate.hook'
import ReactPaginate from "react-paginate"
import Styles from './Manufacturing.module.css'

const PER_PAGE = 5

export const Manufacturing = () => {
    const { data, data2, loading, admin } = useGet('/api/manufacturing/getAllSections', '/api/stoneIncome/getAllSections')
    const { deleteHandler } = useDelete('manufacturing')
    const { sortByDate } = useSortByDate()
    const { manufacturingData, remainderData, manufacturingSum1, manufacturingSum2, outcomeSum1, outcomeSum2 } = useManufacturing(data.manufacturing, data.remainder, data2.outcome)
    const total = []
    const toExcel = total.concat(
        {'#': 'Выработка'}, manufacturingData,
        {
            'Итого 1 слой': manufacturingSum1.reduce((a, b) => a + b, 0),
            'Итого 2 слой': manufacturingSum2.reduce((a, b) => a + b, 0),
            'Итого по слоям': manufacturingSum1.reduce((a, b) => a + b, 0) + manufacturingSum2.reduce((a, b) => a + b, 0),
            'Итого m2 на 1 m3': (manufacturingSum1.reduce((a, b) => a + b, 0) + manufacturingSum2.reduce((a, b) => a + b, 0)) / (outcomeSum1.reduce((a, b) => a + b, 0) + outcomeSum2.reduce((a, b) => a + b, 0)),
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
    const pageCount = Math.ceil(manufacturingData ? manufacturingData.length / PER_PAGE : 0)

    let m2m3 = (manufacturingSum1.reduce((a, b) => a + b, 0) + manufacturingSum2.reduce((a, b) => a + b, 0)) / (outcomeSum1.reduce((a, b) => a + b, 0) + outcomeSum2.reduce((a, b) => a + b, 0))

    if (loading) {
        return (
            <>
                <h3 className={Styles.heading}>
                    Выработка
                    {
                        found ? 
                        <NavLink activeClassName={Styles.active} to={`/panel/manufacturing/create`}>
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
        <div className={Styles.manufacturing}>
            <h3 className={Styles.heading}>
                Выработка
                {
                    found ? 
                    <NavLink activeClassName={Styles.active} to={`/panel/manufacturing/create`}>
                        <i className={`material-icons ${Styles.create}`}>library_add</i>
                    </NavLink> : ''
                }
            </h3>
            <div className={Styles.block}>
                <div className={Styles.wrapper}>
                    <table cellPadding="10" border="0" bordercolor="#304269" className={Styles.table}>
                        <caption>Выработка</caption>
                        <thead>
                            <tr><th>Дата</th><th>Станок</th><th>Слой</th><th>Размер</th><th>Выработка</th>{found ? <th></th> : null}</tr>
                        </thead>
                        <tbody>
                            {
                                manufacturingData ?
                                manufacturingData.sort(sortByDate).slice(offset, offset + PER_PAGE).map(({ id, stoneMachine, layer, dimension, square, date }, i) => {
                                    return (
                                        <tr key={ i }>
                                            <td width="1%">{ date }</td>
                                            <td>{ stoneMachine }</td>
                                            <td>{ layer }</td>
                                            <td>{ dimension }</td>
                                            <td>{ `${square} m2` }</td>
                                            {
                                                found ?
                                                <td width="1%">
                                                    <button className={Styles.deleteButton} type="submit" onClick={() => {deleteHandler('/api/manufacturing/delete', id)}}><i className={`material-icons ${Styles.delete}`}>delete</i></button>
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
                    <p className={Styles.label}>Итого 1 слой: <span className={Styles.span}>{ `${(manufacturingSum1.reduce((a, b) => a + b, 0)).toFixed(1)} m2` }</span></p>
                    <p className={Styles.label}>Итого 2 слой: <span className={Styles.span}>{ `${(manufacturingSum2.reduce((a, b) => a + b, 0)).toFixed(1)} m2` }</span></p>
                    <p className={Styles.label}>Итого по слоям: <span className={Styles.span}>{ `${(manufacturingSum1.reduce((a, b) => a + b, 0) + manufacturingSum2.reduce((a, b) => a + b, 0)).toFixed(1)} m2` }</span></p>
                    <p className={Styles.label}>Итого m2 на 1 m3: <span className={Styles.span}>{ `${m2m3.toFixed(1)} m2/m3` }</span></p>
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
            <Export tableData={toExcel} fileName="manufacturing" />
        </div>
    )
}