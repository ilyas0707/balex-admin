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
            date: `${dateFormatted.getDate()}/${dateFormatted.getMonth() + 1}/${dateFormatted.getFullYear()}`
        }
    }) : ''

    const stoneOutcomeData = stoneOutcome ? stoneOutcome.map(({ id, layer, stoneMachine, stoneVolume, date }) => {
        let dateFormatted = new Date(date)
        return {
            id: id,
            layer: layer, 
            stoneMachine: stoneMachine.name, 
            stoneVolume: stoneVolume, 
            date: `${dateFormatted.getDate()}/${dateFormatted.getMonth() + 1}/${dateFormatted.getFullYear()}`
        }
    }) : ''

    const manufacturingData = manufacturing ? manufacturing.map(({ id, layer, dimension, volume, square, date }) => {
        let dateFormatted = new Date(date)
        return {
            id: id, 
            layer: layer, 
            dimension: dimension, 
            volume: volume,
            square: square,
            date: `${dateFormatted.getDate()}/${dateFormatted.getMonth() + 1}/${dateFormatted.getFullYear()}` 
        }
    }) : ''

    const realizationData = realization ? realization.map(({ id, clientName, layer, dimension, square, pricePerSquare, date }) => {
        let dateFormatted = new Date(date)
        return {
            id: id,
            clientName: clientName, 
            layer: layer,
            dimension: dimension,
            square: square,
            pricePerSquare: pricePerSquare,
            total: square * pricePerSquare,
            date: `${dateFormatted.getDate()}/${dateFormatted.getMonth() + 1}/${dateFormatted.getFullYear()}` 
        }
    }) : ''

    const financeIncomeData = financeIncome ? financeIncome.map(({ id, incomeCategory, description, value, date }) => {
        let dateFormatted = new Date(date)
        return {
            id: id,
            category: incomeCategory, 
            description: description,
            value: value,
            date: `${dateFormatted.getDate()}/${dateFormatted.getMonth() + 1}/${dateFormatted.getFullYear()}` 
        }
    }) : ''

    const financeExpensesData = financeExpenses ? financeExpenses.map(({ id, expenseCategory, description, value, date }) => {
        let dateFormatted = new Date(date)
        return {
            id: id,
            category: expenseCategory, 
            description: description,
            value: value,
            date: `${dateFormatted.getDate()}/${dateFormatted.getMonth() + 1}/${dateFormatted.getFullYear()}`
        }
    }) : ''

    return { stoneIncomeData, stoneOutcomeData, manufacturingData, realizationData, financeIncomeData, financeExpensesData }
}