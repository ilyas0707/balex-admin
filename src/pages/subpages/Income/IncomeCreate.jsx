import React, { useState } from 'react'
import { useGet } from '../../../hooks/get.hook'
import Styles from './IncomeCreate.module.css'

import { Form } from './../../../components/Form/Form'

export const IncomeCreate = () => {
    const [opened, setOpened] = useState(0)
    const { data, loading } = useGet('/admin/stoneMachine/getAll')

    const Income = [
        { type: "number", name: "layer", label: "Слой"},
        { type: "number", name: "volume", label: "Объём(m3)"},
        { type: "text", name: "carNumber", label: "Гос. номер"},
        { type: "text", name: "driverName", label: "ФИО"},
        { type: "number", name: "billNumber", label: "Накладная"},
        { type: "number", name: "pricePerCube", label: "Цена(m3)"},
    ]

    const Machine = [
        { type: "text", name: "name", label: "Станок"},
    ]

    const Outcome = [
        { type: "number", name: "layer", label: "Слой"},
        { type: "number", name: "stoneVolume", label: "Объём(m3)"},
    ]

    const select = [
        { name: "stoneMachine", options: [
            [{ label: 'Станок', id: 'undefined' }], 
            data.object ?
            data.object.map((element) => {
                return { label: element.name, id: element.name }
            }) : ''
        ] },
    ]

    const openTab = (id) => {
        setOpened(id)
    }

    const links = [
        { name: 'Приход' }, { name: 'Станок' }, { name: 'Расход' }
    ]

    const tabs = [
        { data: Income, url: 'api/stoneIncome/createForVolume' },
        { data: Machine, url: 'admin/stoneMachine/create' },
        { id: 'outcome', data: Outcome, url: 'admin/stoneOutcome/create', select: select, machines: data.object },
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
            <div className={Styles.tabs}>
                {
                    links.map(({name}, i) => {
                        return (
                            <a
                                key={ i }
                                href="/"
                                className={`${Styles.tab} ${opened === i ? Styles.active : ''}`}
                                onClick={e => {e.preventDefault(); openTab(i)}}>
                                { name }
                            </a>
                        )
                    })
                }
            </div>
            {
                tabs.map(({id, data, url, select, machines}, i) => {
                    return (
                        <div key={ i } className={`${Styles.form} ${opened === i ? Styles.active : ''}`}>
                            <Form component={ 'income' } id={ id } data={ data } url={ url } select={ select } machines={machines} />
                        </div>
                    )
                })
            }
        </div>
    )
}