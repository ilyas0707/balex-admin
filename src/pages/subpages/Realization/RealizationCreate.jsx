import React, { useState } from 'react'
import { useGet } from '../../../hooks/get.hook'
import Styles from './RealizationCreate.module.css'

import { Form } from './../../../components/Form/Form'

export const RealizationCreate = () => {
    const [opened, setOpened] = useState(0)
    const { data, data2, data3, loading } = useGet('/api/realization/getAllSections', '/client/getAll', '/size/getAll')
    // const Role1 = [
    //     { type: "text", name: "client", label: "Покупатель"},
    //     { type: "number", name: "quantity", label: "Количество(m2)"},
    //     { type: "number", name: "price", label: "Стоимость(m2)"},
    //     { type: "number", name: "total", label: "Итого"},
    // ]

    // const Role2 = [
    //     { type: "text", name: "carNumber", label: "Гос. номер"},
    //     { type: "text", name: "driver", label: "ФИО"},
    //     { type: "number", name: "invoice", label: "Накладная"},
    //     { type: "number", name: "cash", label: "Стоимость"},
    // ]

    // const User = [Role1]

    const Client = [
        { type: "text", name: "name", label: "Имя"},
        { type: "number", name: "phoneNumber", label: "Номер телефона"},
        { type: "text", name: "organization", label: "Организация"},
    ]

    const Realization = [
        { type: "date", name: "date", label: "Дата"},
        // { type: "text", name: "clientName", label: "Клиент"},
        { type: "text", name: "orderNumber", label: "Номер партии"},
        { type: "text", name: "layer", label: "Слой"},
        // { type: "text", name: "dimension", label: "Размеры"},
        { type: "number", name: "square", label: "Количество(m2)"},
        { type: "number", name: "pricePerSquare", label: "Стоимость(m2)"},
    ]

    const RealizationPay = [
        { type: "number", name: "pricePaid", label: "Оплачено"},
    ]

    const select = [
        { name: "id", options: [
            [{ label: 'Клиент', id: 'undefined' }], 
            data.realization ?
            data.realization.map((element) => {
                return { label: `${element.clientName.name}/${element.clientName.organization}/${element.orderNumber}/${element.pricePerSquare * element.square}`, id: element.id }
            }) : ''
        ] }, 
    ]

    const clientSelect = [
        { name: "clientName", options: [
            [{ label: 'Клиент', id: 'undefined' }], 
            data2.object ?
            data2.object.map((element) => {
                return { label: element.name !== null ? `${element.name}/${element.organization}` : '', id: element.name }
            }) : ''
        ] },

        { name: "size", options: [
            [{ label: 'Размеры', id: 'undefined' }], 
            data3.object ?
            data3.object.reduce((acc, current) => {
                const x = acc.find(item => item.size === current.size);
                if (!x) {
                  return acc.concat([current]);
                } else {
                  return acc;
                }
              }, []).map((element) => {
                return { label: element.size !== null ? element.size : '', id: element.size }
            }) : ''
        ] },
    ]

    const size = data3.object ? data3.object.reduce((acc, current) => {
        const x = acc.find(item => item.size === current.size);
        if (!x) {
          return acc.concat([current]);
        } else {
          return acc;
        }
	}, []) : ''

    const currency = [
        { name: "currency", options: [
            [{ label: 'Валюта', id: 'undefined' }], 
            [{ label: 'Сом', id: 'SOM' }], 
            [{ label: 'Доллар', id: 'USD' }], 
            [{ label: 'Евро', id: 'EUR' }],
        ] }, 
    ]

    const paymentType = [
        { name: "paymentType", options: [
            [{ label: 'Метод оплаты', id: 'undefined' }], 
            [{ label: 'Банк', id: 'BANK' }], 
            [{ label: 'Наличными', id: 'CASH' }], 
        ] }, 
    ]

    const openTab = (id) => {
        setOpened(id)
    }

    const links = [
        { name: 'Создать клиента' }, { name: 'Добавить' }, { name: 'Оплатить' }
    ]

    const tabs = [
        { data: Client, url: 'client/create' },
        { id: 'realizationCreate', data: Realization, url: 'api/realization/create', currency: currency, clientSelect: clientSelect, clients: data2.object, size: size },
        { id: 'realization', data: RealizationPay, url: 'api/realization/createForPrice', select: select, clients: data.realization, currency: currency, paymentType: paymentType },
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
                tabs.map(({id, data, url, select, clients, currency, paymentType, clientSelect, size}, i) => {
                    return (
                        <div key={ i } className={`${Styles.form} ${opened === i ? Styles.active : ''}`}>
                            <Form 
                                component={ 'realization' } 
                                id={ id } 
                                data={ data } 
                                url={ url } 
                                select={ select } 
                                clients={ clients } 
                                currency={ currency } 
                                paymentType={ paymentType }
                                clientSelect={ clientSelect }
                                size={ size } />
                        </div>
                    )
                })
            }
        </div>
    )
}