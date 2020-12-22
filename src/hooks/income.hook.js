export const useIncome = (income, outcome, remainder) => {

    const incomeData = income ? income.map(({ id, billNumber, driverName, carNumber, layer, volume, pricePerCube, pricePaid, statusPaid, date }) => {
        let dateFormatted = new Date(date)
        return {
            id: id,
            billNumber: billNumber,
            driverName: driverName, 
            carNumber: carNumber, 
            layer: layer, 
            volume: volume.toFixed(1), 
            pricePerCube: pricePerCube.toFixed(1),
            total: volume * pricePerCube,
            pricePaid: pricePaid,
            statusPaid: statusPaid,
            remainder: (volume * pricePerCube) - pricePaid,
            date: `${dateFormatted.getDate()}/${dateFormatted.getMonth() + 1}/${dateFormatted.getFullYear()}`,
            sortDate: dateFormatted
        }
    }) : ''

    const outcomeData = outcome ? outcome.map(({ id, layer, stoneMachine, stoneVolume, date }) => {
        let dateFormatted = new Date(date)
        return {
            id: id,
            layer: layer, 
            stoneMachine: stoneMachine.name, 
            stoneVolume: stoneVolume.toFixed(1), 
            date: `${dateFormatted.getDate()}/${dateFormatted.getMonth() + 1}/${dateFormatted.getFullYear()}`,
            sortDate: dateFormatted
        }
    }) : ''

    const remainderData = remainder ? remainder.map(({ layer, volume }) => {
        return { 
            layer: layer, 
            volume: volume.toFixed(1)
        }
    }) : ''

    let incomeSum1 = []
    let incomeSum2 = []
    let outcomeSum1 = []
    let outcomeSum2 = []
    let totalSum = []
    let pricePaidSum = []

    if (income) {
        for (let i = 0; i < income.length; i++) {
            if (income[i].layer === '1') {
                incomeSum1[i] = income[i].volume
            } else if (income[i].layer === '2') {
                incomeSum2[i] = income[i].volume
            }
            totalSum[i] = incomeData[i].total
            pricePaidSum[i] = incomeData[i].pricePaid
        }
    }

    if (outcome) {
        for (let i = 0; i < outcome.length; i++) {
            if (outcome[i].layer === '1') {
                outcomeSum1[i] = outcome[i].stoneVolume
            } else if (outcome[i].layer === '2') {
                outcomeSum2[i] = outcome[i].stoneVolume
            }
        }
    }

    return { incomeData, outcomeData, remainderData, incomeSum1, incomeSum2, totalSum, outcomeSum1, outcomeSum2, pricePaidSum }
}