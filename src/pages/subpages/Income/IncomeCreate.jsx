import React from 'react'
import Styles from './IncomeCreate.module.css'

import { Form } from './../../../components/Form/Form'

export const IncomeCreate = () => {
    const Income = [
        { type: "date", name: "date", label: "Дата"},
        { type: "text", name: "layer", label: "Слой"},
        { type: "number", name: "volume", label: "Объём(m3)"},
        { type: "text", name: "carNumber", label: "Гос. номер"},
        { type: "text", name: "driverName", label: "ФИО"},
        { type: "number", name: "billNumber", label: "Накладная"},
        { type: "number", name: "pricePerCube", label: "Цена(m3)"},
    ]

    return (
        <div className={Styles.create}>
            <h2 className={Styles.heading}>Создать</h2>
            <Form component={ 'income' } data={ Income } url={ 'api/stoneIncome/createForVolume' } />
        </div>
    )
}