export const useAnalytics = (stoneIncome, realization, income, expenses) => {

    const stoneIncomeData = stoneIncome ? stoneIncome.map(({ id, expenseCategory, description, value, date }) => {
        let dateFormatted = new Date(date)
        return {
            id: id,
            category: expenseCategory === 'STONE_INCOME' ? 'Приход камня' : null, 
            description: description,
            value: value,
            date: `${dateFormatted.getDate()}/${dateFormatted.getMonth() + 1}/${dateFormatted.getFullYear()}`,
            sortDate: dateFormatted
        }
    }) : ''

    const realizationData = realization ? realization.map(({ id, incomeCategory, description, value, currency, date }) => {
        let dateFormatted = new Date(date)
        return {
            id: id,
            category: incomeCategory === 'REALIZATION' ? 'Реализация камня' : null, 
            description: description,
            value: value,
            currency: currency,
            date: `${dateFormatted.getDate()}/${dateFormatted.getMonth() + 1}/${dateFormatted.getFullYear()}`,
            sortDate: dateFormatted
        }
    }) : ''

    const incomeData = income ? income.map(({ id, incomeCategory, description, value, currency, date }) => {
        let dateFormatted = new Date(date)
        return {
            id: id,
            category: incomeCategory === 'INVESTMENT' ? 'Инвестиция' : null, 
            description: description,
            value: value,
            currency: currency,
            date: `${dateFormatted.getDate()}/${dateFormatted.getMonth() + 1}/${dateFormatted.getFullYear()}`,
            sortDate: dateFormatted
        }
    }) : ''

    const expensesData = expenses ? expenses.map(({ id, expenseCategory, description, value, currency, date }) => {
        let dateFormatted = new Date(date)
        return {
            id: id,
            category: expenseCategory === 'TRANSPORT' ? 'Транспорт' : 
            expenseCategory === 'SALARY' ? 'Зарплаты' :
            expenseCategory === 'STONE_INCOME' ? 'Приход камня' :
            expenseCategory === 'FOOD' ? 'Еда' :
            expenseCategory === 'OTHER' ? 'Другие' : null, 
            description: description,
            value: value,
            currency: currency,
            date: `${dateFormatted.getDate()}/${dateFormatted.getMonth() + 1}/${dateFormatted.getFullYear()}`,
            sortDate: dateFormatted
        }
    }) : ''

    let stoneIncomeSum = []
    let totalSumSOM = []
    let totalSumUSD = []
    let totalSumEUR = []

    let totalIncomeSumSOM = []
    let totalIncomeSumUSD = []
    let totalIncomeSumEUR = []

    let totalExpensesSumSOM = []
    let totalExpensesSumUSD = []
    let totalExpensesSumEUR = []

    if (stoneIncome) {
        for (let i = 0; i < stoneIncome.length; i++) {
            stoneIncomeSum[i] = stoneIncome[i].value
        }
    }

    if (realization) {
        for (let i = 0; i < realization.length; i++) {
            if (realization[i].currency === 'SOM') {
                totalSumSOM[i] = realizationData[i].value
            } else if (realization[i].currency === 'USD') {
                totalSumUSD[i] = realizationData[i].value
            } else if (realization[i].currency === 'EUR') {
                totalSumEUR[i] = realizationData[i].value
            }
        }
    }

    if (income) {
        for (let i = 0; i < income.length; i++) {
            if (income[i].currency === 'SOM') {
                totalIncomeSumSOM[i] = incomeData[i].value
            } else if (income[i].currency === 'USD') {
                totalIncomeSumUSD[i] = incomeData[i].value
            } else if (income[i].currency === 'EUR') {
                totalIncomeSumEUR[i] = incomeData[i].value
            }
        }
    }

    if (expenses) {
        for (let i = 0; i < expenses.length; i++) {
            if (expenses[i].currency === 'SOM') {
                totalExpensesSumSOM[i] = expensesData[i].value
            } else if (expenses[i].currency === 'USD') {
                totalExpensesSumUSD[i] = expensesData[i].value
            } else if (expenses[i].currency === 'EUR') {
                totalExpensesSumEUR[i] = expensesData[i].value
            }
        }
    }

    return { stoneIncomeData, realizationData, incomeData, expensesData, stoneIncomeSum, totalSumSOM, totalSumUSD, totalSumEUR, totalIncomeSumSOM, totalIncomeSumUSD, totalIncomeSumEUR, totalExpensesSumSOM, totalExpensesSumUSD, totalExpensesSumEUR }
}