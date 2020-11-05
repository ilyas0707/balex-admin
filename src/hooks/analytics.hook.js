export const useAnalytics = (stoneIncome, realization, income, expenses) => {

    const stoneIncomeData = stoneIncome ? stoneIncome.map(({ id, expenseCategory, description, value, date }) => {
        let dateFormatted = new Date(date)
        return {
            id: id,
            category: expenseCategory, 
            description: description,
            value: value,
            date: `${dateFormatted.getDate()}/${dateFormatted.getMonth() + 1}/${dateFormatted.getFullYear()}` 
        }
    }) : ''

    const realizationData = realization ? realization.map(({ id, incomeCategory, description, value, date }) => {
        let dateFormatted = new Date(date)
        return {
            id: id,
            category: incomeCategory, 
            description: description,
            value: value,
            date: `${dateFormatted.getDate()}/${dateFormatted.getMonth() + 1}/${dateFormatted.getFullYear()}` 
        }
    }) : ''

    const incomeData = income ? income.map(({ id, incomeCategory, description, value, date }) => {
        let dateFormatted = new Date(date)
        return {
            id: id,
            category: incomeCategory, 
            description: description,
            value: value,
            date: `${dateFormatted.getDate()}/${dateFormatted.getMonth() + 1}/${dateFormatted.getFullYear()}` 
        }
    }) : ''

    const expensesData = expenses ? expenses.map(({ id, expenseCategory, description, value, date }) => {
        let dateFormatted = new Date(date)
        return {
            id: id,
            category: expenseCategory, 
            description: description,
            value: value,
            date: `${dateFormatted.getDate()}/${dateFormatted.getMonth() + 1}/${dateFormatted.getFullYear()}`
        }
    }) : ''

    return { stoneIncomeData, realizationData, incomeData, expensesData }
}