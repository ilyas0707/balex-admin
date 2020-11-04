import React from 'react'
import { NavLink } from 'react-router-dom'
import { Export } from '../../../components/Export/Export'
import { useGet } from '../../../hooks/get.hook'
import { useDelete } from '../../../hooks/delete.hook'
import { useManufacturing } from '../../../hooks/manufacturing.hook'
import Styles from './Manufacturing.module.css'

export const Manufacturing = () => {
    const { data, loading, admin } = useGet('/api/manufacturing/getAllSections')
    const { deleteHandler } = useDelete('manufacturing')
    const { manufacturingData, remainderData } = useManufacturing(data.manufacturing, data.remainder)
    const total = []
    const toExcel = total.concat({'#': 'Выработка'}, manufacturingData, {'#': 'Остаток'}, remainderData)

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
                    <table cellPadding="7" border="1" bordercolor="#304269" className={Styles.table}>
                        <caption>Выработка</caption>
                        <thead>
                            <tr><th>Слой</th><th>Размер</th><th>Объём</th><th>Выработка(m2)</th><th>Дата</th>{found ? <th></th> : null}</tr>
                        </thead>
                        <tbody>
                            {
                                manufacturingData ?
                                manufacturingData.map(({ id, layer, dimension, volume, square, date }, i) => {
                                    return (
                                        <tr key={ i }>
                                            <td>{ layer }</td>
                                            <td>{ dimension }</td>
                                            <td>{ volume }</td>
                                            <td>{ square }</td>
                                            <td width="1%">{ date }</td>
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
                <div className={Styles.wrapper}>
                    <table cellPadding="7" border="1" bordercolor="#304269" className={Styles.table}>
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
                                            <td>{ volume }</td>
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