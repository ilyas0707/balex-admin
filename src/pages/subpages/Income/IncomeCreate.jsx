import React from 'react'
import Styles from './IncomeCreate.module.css'

import { Form } from './../../../components/Form/Form'

export const IncomeCreate = () => {
    const Role1 = [
        { type: "number", name: "volume", label: "Объём(m3)"},
        { type: "number", name: "layers", label: "Слои"},
    ]

    const Role2 = [
        { type: "text", name: "carNumber", label: "Гос. номер"},
        { type: "text", name: "driver", label: "ФИО"},
        { type: "number", name: "invoice", label: "Накладная"},
        { type: "number", name: "cash", label: "Стоимость"},
    ]

    const User = [Role1, Role2]

    const select = [
        // { name: "gender", options: [
        //     { label: 'Пол', id: 'undefined' }, 
        //     { label: 'Мужской', id: 'male' }, 
        //     { label: 'Женский', id: 'female' } 
        // ] },
        // { name: "level", options: [
        //     { label: 'Статус', id: 0 }, 
        //     { label: 'Ученик', id: 1 }, 
        //     { label: 'Младший ментор', id: 2 }, 
        //     { label: 'Старший ментор', id: 3 }, 
        //     { label: 'Администратор', id: 4 }
        // ] },
        // { name: "courseId", options: [
        //     { label: 'Курс', id: 0 }, 
        //     { label: 'JavaScript', id: 'JavaScript' }, 
        //     { label: 'Java', id: 'Java' }, 
        //     { label: 'Python', id: 'Python' }
        // ] },
    ]

    return (
        <div className={Styles.create}>
            <Form data={ User } select={ select } />
        </div>
    )
}