import React from 'react'
import { useGet } from '../../../hooks/get.hook'
import Styles from './IncomeAccountingCreate.module.css'

import { Form } from './../../../components/Form/Form'

export const IncomeAccountingCreate = () => {
    const { data, loading } = useGet('/api/stoneIncome/getAll')

    const IncomeAccounting = [
        { type: "number", name: "pricePaid", label: "Оплачено"},
    ]

    const select = [
        { name: "id", options: [
            [{ label: 'Клиент', id: 'undefined' }], 
            data.object ?
            data.object.map((element) => {
                return { label: `${element.driverName}/${element.billNumber}/${element.pricePerCube * element.volume}`, id: element.id }
            }) : ''
        ] }, 
    ]

    if (loading) {
        return (
            <>
                <h3 className={Styles.heading}>Создать</h3>
                <div className={Styles.loading}></div>
            </>
        )
    }

    return (
        <div className={Styles.create}>
            <h2 className={Styles.heading}>Создать</h2>
            <Form id={ 'incomeAccounting' } component={ 'incomeAccounting' } data={ IncomeAccounting } url={ 'api/stoneIncome/createForPrice' } select={ select } clients={ data.object } />
        </div>
    )
}