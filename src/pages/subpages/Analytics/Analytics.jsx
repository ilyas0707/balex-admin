import React from 'react'
import Styles from './Analytics.module.css'

import { BarChart, Bar, LineChart, ResponsiveContainer, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

export const Analytics = () => {
    const line = [
        { name: 'Янв.', 'Приход': 4000, 'Реализация': 2400 },
        { name: 'Фев.', 'Приход': 3000, 'Реализация': 1398 },
        { name: 'Март', 'Приход': 2000, 'Реализация': 9800 },
        { name: 'Апр.', 'Приход': 2780, 'Реализация': 3908 },
        { name: 'Май', 'Приход': 1890, 'Реализация': 4800 },
        { name: 'Июнь', 'Приход': 2390, 'Реализация': 3800 },
        { name: 'Июль', 'Приход': 3490, 'Реализация': 4300 },
        { name: 'Авг.', 'Приход': 1100, 'Реализация': 1500 },
        { name: 'Сент.', 'Приход': 3400, 'Реализация': 2200 },
        { name: 'Окт.', 'Приход': 2560, 'Реализация': 3700 },
        { name: 'Нояб.', 'Приход': 1400, 'Реализация': 1900 },
        { name: 'Дек.', 'Приход': 3600, 'Реализация': 2450 },
    ]

    return (
        <div className={Styles.block}>
            <div className={Styles.item}>
                <ResponsiveContainer>
                    <LineChart
                        data={line}
                        margin={{
                        top: 5, right: 30, left: 20, bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="Реализация" stroke="#304269" />
                        <Line type="monotone" dataKey="Приход" stroke="#F26101" activeDot={{ r: 8 }} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
            <div className={Styles.item}>
                <ResponsiveContainer>
                    <BarChart
                        data={line}
                        margin={{
                        top: 5, right: 30, left: 20, bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="Реализация" fill="#304269" />
                        <Bar dataKey="Приход" fill="#F26101" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}