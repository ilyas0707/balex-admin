import React, { useState } from 'react'
import { useAll } from '../../hooks/all.hook'
import { useError } from '../../hooks/error.hook'
import { useGetPast } from '../../hooks/getPast.hook'
import { AllSections } from '../AllSections/AllSections'
import Styles from './ExportPast.module.css'

export const ExportPast = () => {
    const { pastHandler, data, loading } = useGetPast()
    const [form, setForm] = useState({})
    const errorMessage = useError()

    const { stoneIncomeData, stoneOutcomeData, manufacturingData, realizationData, financeIncomeData, financeExpensesData, incomeSum1, incomeSum2, totalIncomeSum, pricePaidSum, outcomeSum1, outcomeSum2, manufacturingSum1, manufacturingSum2, realizationSum1, realizationSum2, totalSumSOM, totalSumUSD, totalSumEUR, paidSumSOM, paidSumUSD, paidSumEUR, totalIncomeSumSOM, totalIncomeSumUSD, totalIncomeSumEUR, totalExpensesSumSOM, totalExpensesSumUSD, totalExpensesSumEUR } = useAll(data.stoneIncome, data.stoneOutcome, data.manufacturing, data.realization, data.financeIncome, data.financeExpenses)

    const changeHandler = event => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }

    let dateBefore = new Date(form.dateBefore)
    let dateAfter = new Date(form.dateAfter)

    return (
        <>
            <h3 className={Styles.heading}>Получить данные в промежутке</h3>
            <div className={Styles.export}>
                <form className={Styles.form} action="#">
                    <div className={Styles.inputBlock}>
                        <label htmlFor="dateBefore">Дата с:</label>
                        <input className={Styles.input} type="date" name="dateBefore" id="dateBefore" onChange={changeHandler} />
                    </div>
                    <div className={Styles.inputBlock}>
                        <label htmlFor="dateAfter">Дата по:</label>
                        <input className={Styles.input} type="date" name="dateAfter" id="dateAfter" onChange={changeHandler} />
                    </div>
                    <div className={Styles.buttons}>
                        <button
                            className={Styles.submit}
                            type="submit" 
                            onClick={e => {
                                e.preventDefault(); 
                                form.dateBefore !== '' && form.dateAfter ?
                                pastHandler('/api/login/getAllBetween', {
                                    date1: dateBefore.toISOString(),
                                    date2: dateAfter.toISOString(),
                                }) : errorMessage('Вы должны ввести даты!')
                            }}>
                            Получить данные
                        </button>
                    </div>
                </form>
                {
                    loading ? <div className={Styles.loading}></div> :
                    data.stoneIncome && data.stoneOutcome && data.manufacturing && data.realization && data.financeIncome && data.financeExpenses ?
                    <AllSections data={ [stoneIncomeData, stoneOutcomeData, manufacturingData, realizationData, financeIncomeData, financeExpensesData, incomeSum1, incomeSum2, totalIncomeSum, pricePaidSum, outcomeSum1, outcomeSum2, manufacturingSum1, manufacturingSum2, realizationSum1, realizationSum2, totalSumSOM, totalSumUSD, totalSumEUR, paidSumSOM, paidSumUSD, paidSumEUR, totalIncomeSumSOM, totalIncomeSumUSD, totalIncomeSumEUR, totalExpensesSumSOM, totalExpensesSumUSD, totalExpensesSumEUR] } /> : ''
                }
            </div>
        </>
    )
}