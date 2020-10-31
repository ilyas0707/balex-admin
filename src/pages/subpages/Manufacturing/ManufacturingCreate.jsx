import React from 'react'
import Styles from './ManufacturingCreate.module.css'

import { Form } from './../../../components/Form/Form'

export const ManufacturingCreate = () => {
    // const Role1 = [
    //     { type: "number", name: "volume", label: "Объём(m3)"},
    //     { type: "number", name: "output", label: "Выхлоп"},
    // ]

    // const Role2 = [
    //     { type: "text", name: "carNumber", label: "Гос. номер"},
    //     { type: "text", name: "driver", label: "ФИО"},
    //     { type: "number", name: "invoice", label: "Накладная"},
    //     { type: "number", name: "cash", label: "Стоимость"},
    // ]

    // const User = [Role1]

    // const select = [
    //     { name: "categories", options: [
    //         { label: 'Категории', name: '' }, 
    //         { label: 'A1', name: 'A1' }, 
    //         { label: 'B2', name: 'B2' }, 
    //         { label: 'C3', name: 'C3' } 
    //     ] },
    // ]

    const Manufacturing = [
        { type: "number", name: "layer", label: "Слой"},
        { type: "text", name: "dimension", label: "Размеры"},
        { type: "number", name: "volume", label: "Объём(m3)"},
        { type: "number", name: "square", label: "Выработка(m2)"},
    ]

    return (
        <div className={Styles.create}>
            <h2 className={Styles.heading}>Создать</h2>
            <Form component={ 'manufacturing' } data={ Manufacturing } url={ 'api/manufacturing/create' } />
        </div>
    )
}