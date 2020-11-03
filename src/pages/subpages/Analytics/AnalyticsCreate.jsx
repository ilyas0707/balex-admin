import React, { useState } from 'react'
import Styles from './AnalyticsCreate.module.css'

import { Form } from './../../../components/Form/Form'

export const AnalyticsCreate = () => {
    const [opened, setOpened] = useState(0)

    const AnalyticsIncome = [
        { type: "text", name: "description", label: "Описание"},
        { type: "number", name: "value", label: "Сумма"},
    ]

    const AnalyticsExpenses = [
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
        { name: "expensesCategory", options: [[
            { label: 'Категории', id: '' }, 
            { label: 'Транспорт', id: 'TRANSPORT' }, 
            { label: 'Зарплаты', id: 'SALARY' }, 
            { label: 'Приход камня', id: 'STONE_INCOME' }, 
            { label: 'Еда', id: 'FOOD' }, 
            { label: 'Другие', id: 'OTHER' }, 
        ]] },
    ]

    const openTab = (id) => {
        setOpened(id)
    }

    const links = [
        { name: 'Приходящие транзакции' }, { name: 'Уходящие транзакции' }
    ]

    const tabs = [
        { data: AnalyticsIncome, url: 'admin/finance/createIncome', select: selectIncome },
        { data: AnalyticsExpenses, url: 'admin/finance/createExpenses', select: selectExpenses },
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
                tabs.map(({data, url, select}, i) => {
                    return (
                        <div key={ i } className={`${Styles.form} ${opened === i ? Styles.active : ''}`}>
                            <Form component={ 'analytics' } data={ data } url={ url } select={ select } />
                        </div>
                    )
                })
            }
        </div>
    )
}