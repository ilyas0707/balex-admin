import React from 'react'
import { NavLink } from 'react-router-dom'
import { Export } from '../../../components/Export/Export'
import { useGet } from '../../../hooks/get.hook'
import { useRealization } from '../../../hooks/realization.hook'
import Styles from './Realization.module.css'

export const Realization = () => {
    const { data, loading } = useGet('/api/realization/getAllSections')
    console.log(data);
    const { realizationData, remainderData } = useRealization(data.realization, data.remainder)
    const total = []
    const toExcel = total.concat({'#': 'Реализация'}, realizationData, {'#': 'Остаток'}, remainderData)

    if (loading) {
        return (
            <>
                <h3 className={Styles.heading}>
                    Реализация
                    <NavLink activeClassName={Styles.active} to={`/panel/realization/create`}>
                        <i className={`material-icons ${Styles.create}`}>library_add</i>
                    </NavLink>
                </h3>
                <div className={Styles.loading}></div>
            </>
        )
    }

    return (
        <div className={Styles.realization}>
            <h3 className={Styles.heading}>
                Реализация
                <NavLink activeClassName={Styles.active} to={`/panel/realization/create`}>
                    <i className={`material-icons ${Styles.create}`}>library_add</i>
                </NavLink>
            </h3>
            <div className={Styles.block}>
                <div className={Styles.wrapper}>
                    <table cellPadding="7" border="1" bordercolor="#304269" className={Styles.table}>
                        <caption>Реализация</caption>
                        <thead>
                            <tr><th>Клиент</th><th>Слой</th><th>Размеры</th><th>Площадь</th><th>Цена(m2)</th><th>Итого</th><th>Дата</th></tr>
                        </thead>
                        <tbody>
                            {
                                realizationData ?
                                realizationData.map(({ clientName, layer, dimension, square, pricePerSquare, total, date }, i) => {
                                    return (
                                        <tr key={ i }>
                                            <td>{ clientName }</td>
                                            <td>{ layer }</td>
                                            <td>{ dimension }</td>
                                            <td>{ square }</td>
                                            <td>{ pricePerSquare }</td>
                                            <td>{ total }</td>
                                            <td width="1%">{ date }</td>
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
            <Export tableData={toExcel} fileName="realization" />
        </div>
    )
}