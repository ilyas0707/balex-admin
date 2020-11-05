import React, { useState } from 'react'
import { useAll } from '../../hooks/all.hook'
import { useGetPast } from '../../hooks/getPast.hook'
import { Export } from '../Export/Export'
import Styles from './ExportPast.module.css'

export const ExportPast = () => {
    const { pastHandler, data } = useGetPast()
    const [form, setForm] = useState({})

    const { stoneIncomeData, stoneOutcomeData, manufacturingData, realizationData, financeIncomeData, financeExpensesData } = useAll(data.stoneIncome, data.stoneOutcome, data.manufacturing, data.realization, data.financeIncome, data.financeExpenses)
    let total = []
    const toExcel = total.concat({'#': 'Приходы'}, stoneIncomeData, {'#': 'Расходы'}, stoneOutcomeData, {'#': 'Выработка'}, manufacturingData, {'#': 'Реализация'}, realizationData, {'#': 'Приходящие транзакции'}, financeIncomeData, {'#': 'Уходящие транзакции'}, financeExpensesData)

    const changeHandler = event => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }

    console.log(data);
    console.log(toExcel);

    let dateBefore = new Date(form.dateBefore)
    let dateAfter = new Date(form.dateAfter)

    return (
        <div className={Styles.export}>
            <form className={Styles.form} action="#">
                <input className={Styles.input} type="date" name="dateBefore" id="dateBefore" onChange={changeHandler} />
                <input className={Styles.input} type="date" name="dateAfter" id="dateAfter" onChange={changeHandler} />
                <div className={Styles.buttons}>
                    <button
                        className={Styles.submit}
                        type="submit" 
                        onClick={e => {
                            e.preventDefault(); 
                            pastHandler('/api/login/getAllBetween', {
                                dayBefore: dateAfter.getDate(),
                                monthBefore: dateAfter.getMonth() + 1,
                                yearBefore: dateAfter.getFullYear(),
                                dayAfter: dateBefore.getDate(),
                                monthAfter: dateBefore.getMonth() + 1,
                                yearAfter: dateBefore.getFullYear()
                            })
                        }}>
                        Получить данные
                    </button>
                    {
                        data.stoneIncome && data.stoneOutcome && data.manufacturing && data.realization && data.financeIncome && data.financeExpenses ?
                        <Export tableData={toExcel} fileName="pastData" /> : ''
                    }
                </div>
            </form>
        </div>
    )
}