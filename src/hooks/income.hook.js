export const useIncome = (income, outcome, remainder) => {

    const incomeData = income ? income.map(({ billNumber, driverName, carNumber, layer, volume, pricePerCube, pricePaid, statusPaid, date }) => {
        let dateFormatted = new Date(date)
        return { 
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

    const outcomeData = outcome ? outcome.map(({ layer, stoneMachine, stoneVolume, date }) => {
        let dateFormatted = new Date(date)
        return { 
            layer: layer, 
            stoneMachine: stoneMachine.name, 
            stoneVolume: stoneVolume, 
            date: `${dateFormatted.getDate()}/${dateFormatted.getMonth() + 1}/${dateFormatted.getFullYear()}`
        }
    }) : ''

    const remainderData = remainder ? remainder.map(({ layer, volume }) => {
        return { 
            layer: layer, 
            volume: volume 
        }
    }) : ''

    return { incomeData, outcomeData, remainderData }
}