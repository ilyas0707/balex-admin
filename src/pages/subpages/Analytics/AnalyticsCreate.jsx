import React, { useState } from 'react'
import Styles from './AnalyticsCreate.module.css'

import { Form } from './../../../components/Form/Form'

export const AnalyticsCreate = () => {
    const [opened, setOpened] = useState(0)

    const AnalyticsIncome = [
        { type: "date", name: "date", label: "Дата"},
        { type: "text", name: "description", label: "Описание"},
        { type: "number", name: "value", label: "Сумма"},
    ]

    const AnalyticsExpenses = [
        { type: "date", name: "date", label: "Дата"},
        { type: "text", name: "description", label: "Описание"},
        { type: "number", name: "value", label: "Сумма"},
    ]

    const selectIncome = [
        { name: "incomeCategory", options: [[
            { label: 'Категории', id: '' }, 
            { label: 'Инвестиция', id: 'INVESTMENT' }, 
            { label: 'Реализация', id: 'REALIZATION' }, 
        ]] },
    ]

    const selectExpenses = [
        { name: "expenseCategory", options: [[
            { label: 'Категории', id: '' }, 
            { label: 'Транспорт', id: 'TRANSPORT' }, 
            { label: 'Зарплаты', id: 'SALARY' }, 
            { label: 'Приход камня', id: 'STONE_INCOME' }, 
            { label: 'Еда', id: 'FOOD' }, 
            { label: 'Другие', id: 'OTHER' }, 
        ]] },
    ]

    const currency = [
        { name: "currency", options: [
            [{ label: 'Валюта', id: 'undefined' }], 
            [{ label: 'Сом', id: 'SOM' }], 
            [{ label: 'Доллар', id: 'USD' }], 
            [{ label: 'Евро', id: 'EUR' }],
        ] }, 
    ]

    const openTab = (id) => {
        setOpened(id)
    }

    const links = [
        { name: 'Приходящие транзакции' }, { name: 'Уходящие транзакции' }
    ]

    const tabs = [
        { data: AnalyticsIncome, url: 'admin/finance/createIncome', select: selectIncome, currency: currency },
        { data: AnalyticsExpenses, url: 'admin/finance/createExpenses', select: selectExpenses, currency: currency },
    ]

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
                tabs.map(({data, url, select, currency}, i) => {
                    return (
                        <div key={ i } className={`${Styles.form} ${opened === i ? Styles.active : ''}`}>
                            <Form component={ 'analytics' } data={ data } url={ url } select={ select } currency={ currency } />
                        </div>
                    )
                })
            }
        </div>
    )
}