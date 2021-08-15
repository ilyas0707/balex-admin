import React from 'react'
import Styles from './OrderCreate.module.css'

import { Form } from '../../../components/Form/Form'
import { useAuth } from '../../../hooks/auth.hook'

export const OrderCreate = () => {
    const { profile } = useAuth()

    const Income = [
        { type: 'date', name: 'dateCreated', label: 'Дата' },
        { type: 'number', name: 'amount', label: 'Сумма' },
        { type: 'text', name: 'description', label: 'Описание' },
    ]

    const paymentType = [
        {
            name: 'paymentMethod',
            options: [
                [{ label: 'Метод оплаты', id: 'undefined' }],
                [{ label: 'Банк', id: 'BANK' }],
                [{ label: 'Наличными', id: 'CASH' }],
            ],
        },
    ]

    return (
        <div className={Styles.create}>
            <h2 className={Styles.heading}>Создать приход</h2>
            <Form
                component={'income'}
                data={Income}
                url={`api/income/create/${profile.object.id}`}
                paymentType={paymentType}
            />
        </div>
    )
}
