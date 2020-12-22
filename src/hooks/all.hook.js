export const useAll = (stoneIncome, stoneOutcome, manufacturing, realization, financeIncome, financeExpenses) => {

    const stoneIncomeData = stoneIncome ? stoneIncome.map(({ id, billNumber, driverName, carNumber, layer, volume, pricePerCube, pricePaid, statusPaid, date }) => {
        let dateFormatted = new Date(date)
        return {
            id: id,
            billNumber: billNumber,
            driverName: driverName, 
            carNumber: carNumber, 
            layer: layer, 
            volume: volume, 
            pricePerCube: pricePerCube,
            total: volume * pricePerCube,
            pricePaid: pricePaid,
            statusPaid: statusPaid,
            remainder: (volume * pricePerCube) - pricePaid,
            date: `${dateFormatted.getDate()}/${dateFormatted.getMonth() + 1}/${dateFormatted.getFullYear()}`,
            sortDate: dateFormatted
        }
    }) : ''

    const stoneOutcomeData = stoneOutcome ? stoneOutcome.map(({ id, layer, stoneMachine, stoneVolume, date }) => {
        let dateFormatted = new Date(date)
        return {
            id: id,
            layer: layer, 
            stoneMachine: stoneMachine.name, 
            stoneVolume: stoneVolume, 
            date: `${dateFormatted.getDate()}/${dateFormatted.getMonth() + 1}/${dateFormatted.getFullYear()}`,
            sortDate: dateFormatted
        }
    }) : ''

    const manufacturingData = manufacturing ? manufacturing.map(({ id, layer, dimension, volume, square, date }) => {
        let dateFormatted = new Date(date)
        return {
            id: id, 
            layer: layer, 
            dimension: dimension !== null && dimension !== undefined ? dimension.size : '', 
            volume: volume,
            square: square,
            date: `${dateFormatted.getDate()}/${dateFormatted.getMonth() + 1}/${dateFormatted.getFullYear()}`,
            sortDate: dateFormatted
        }
    }) : ''

    const realizationData = realization ? realization.map(({ id, clientName, orderNumber, layer, dimension, square, pricePerSquare, pricePaid, currency, statusPaid, date, datePaid }) => {
        let dateFormatted = new Date(date)
        let datePaidFormatted = new Date(datePaid)
        return {
            id: id,
            clientName: clientName !== null && clientName !== undefined ? `${clientName.name}/${clientName.organization}` : '',
            orderNumber: orderNumber, 
            layer: layer,
            dimension: dimension !== null && dimension !== undefined ? dimension.size : '',
            square: square,
            pricePerSquare: pricePerSquare,
            total: square * pricePerSquare,
            pricePaid: pricePaid,
            currency: currency,
            statusPaid: statusPaid,
            remainder: (square * pricePerSquare) - pricePaid,
            date: `${dateFormatted.getDate()}/${dateFormatted.getMonth() + 1}/${dateFormatted.getFullYear()}`,
            datePaid: datePaid !== null ? `${datePaidFormatted.getDate()}/${datePaidFormatted.getMonth() + 1}/${datePaidFormatted.getFullYear()}` : '',
            sortDate: dateFormatted 
        }
    }) : ''

    const financeIncomeData = financeIncome ? financeIncome.map(({ id, incomeCategory, description, value, currency, date }) => {
        let dateFormatted = new Date(date)
        return {
            id: id,
            category: incomeCategory === 'INVESTMENT' ? 'Инвестиция' :
            incomeCategory === 'REALIZATION' ? 'Реализация' : null, 
            description: description,
            value: value,
            currency: currency,
            date: `${dateFormatted.getDate()}/${dateFormatted.getMonth() + 1}/${dateFormatted.getFullYear()}` 
        }
    }) : ''

    const financeExpensesData = financeExpenses ? financeExpenses.map(({ id, expenseCategory, description, value, currency, date }) => {
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
            currency: currency === null ? 'SOM' : currency,
            date: `${dateFormatted.getDate()}/${dateFormatted.getMonth() + 1}/${dateFormatted.getFullYear()}`
        }
    }) : ''

    let incomeSum1 = []
    let incomeSum2 = []
    let outcomeSum1 = []
    let outcomeSum2 = []
    let totalIncomeSum = []
    let pricePaidSum = []

    if (stoneIncome) {
        for (let i = 0; i < stoneIncome.length; i++) {
            if (stoneIncome[i].layer === '1') {
                incomeSum1[i] = stoneIncome[i].volume
            } else if (stoneIncome[i].layer === '2') {
                incomeSum2[i] = stoneIncome[i].volume
            }
            totalIncomeSum[i] = stoneIncomeData[i].total
            pricePaidSum[i] = stoneIncomeData[i].pricePaid
        }
    }

    if (stoneOutcome) {
        for (let i = 0; i < stoneOutcome.length; i++) {
            if (stoneOutcome[i].layer === '1') {
                outcomeSum1[i] = stoneOutcomeData[i].stoneVolume
            } else if (stoneOutcome[i].layer === '2') {
                outcomeSum2[i] = stoneOutcomeData[i].stoneVolume
            }
        }
    }

    let manufacturingSum1 = []
    let manufacturingSum2 = []

    if (manufacturing) {
        for (let i = 0; i < manufacturing.length; i++) {
            if (manufacturing[i].layer === '1') {
                manufacturingSum1[i] = manufacturing[i].square
            } else if (manufacturing[i].layer === '2') {
                manufacturingSum2[i] = manufacturing[i].square
            }
        }
    }

    let realizationSum1 = []
    let realizationSum2 = []
    let totalSumSOM = []
    let totalSumUSD = []
    let totalSumEUR = []

    let paidSumSOM = []
    let paidSumUSD = []
    let paidSumEUR = []

    if (realization) {
        for (let i = 0; i < realization.length; i++) {
            if (realization[i].layer === '1') {
                realizationSum1[i] = realization[i].square
            } else if (realization[i].layer === '2') {
                realizationSum2[i] = realization[i].square
            }
            if (realization[i].currency === 'SOM') {
                totalSumSOM[i] = realizationData[i].total
            } else if (realization[i].currency === 'USD') {
                totalSumUSD[i] = realizationData[i].total
            } else if (realization[i].currency === 'EUR') {
                totalSumEUR[i] = realizationData[i].total
            }
            if (realization[i].currency === 'SOM') {
                paidSumSOM[i] = realizationData[i].pricePaid
            } else if (realization[i].currency === 'USD') {
                paidSumUSD[i] = realizationData[i].pricePaid
            } else if (realization[i].currency === 'EUR') {
                paidSumEUR[i] = realizationData[i].pricePaid
            }
        }
    }

    let totalIncomeSumSOM = []
    let totalIncomeSumUSD = []
    let totalIncomeSumEUR = []

    let totalExpensesSumSOM = []
    let totalExpensesSumUSD = []
    let totalExpensesSumEUR = []

    if (financeIncome) {
        for (let i = 0; i < financeIncome.length; i++) {
            if (financeIncome[i].currency === 'SOM') {
                totalIncomeSumSOM[i] = financeIncomeData[i].value
            } else if (financeIncome[i].currency === 'USD') {
                totalIncomeSumUSD[i] = financeIncomeData[i].value
            } else if (financeIncome[i].currency === 'EUR') {
                totalIncomeSumEUR[i] = financeIncomeData[i].value
            }
        }
    }

    if (financeExpenses) {
        for (let i = 0; i < financeExpenses.length; i++) {
            if (financeExpenses[i].currency === 'SOM' || financeExpenses[i].currency === null) {
                totalExpensesSumSOM[i] = financeExpensesData[i].value
            } else if (financeExpenses[i].currency === 'USD') {
                totalExpensesSumUSD[i] = financeExpensesData[i].value
            } else if (financeExpenses[i].currency === 'EUR') {
                totalExpensesSumEUR[i] = financeExpensesData[i].value
            }
        }
    }

    return { stoneIncomeData, stoneOutcomeData, manufacturingData, realizationData, financeIncomeData, financeExpensesData, incomeSum1, incomeSum2, totalIncomeSum, pricePaidSum, outcomeSum1, outcomeSum2, manufacturingSum1, manufacturingSum2, realizationSum1, realizationSum2, totalSumSOM, totalSumUSD, totalSumEUR, paidSumSOM, paidSumUSD, paidSumEUR, totalIncomeSumSOM, totalIncomeSumUSD, totalIncomeSumEUR, totalExpensesSumSOM, totalExpensesSumUSD, totalExpensesSumEUR }
}