export const useRealization = (realization, remainder) => {

    const realizationData = realization ? realization.map(({ id, clientName, orderNumber, layer, dimension, square, pricePerSquare, pricePaid, currency, statusPaid, date, datePaid, paymentType }) => {
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
            paymentType: paymentType,
            sortDate: dateFormatted
        }
    }) : ''

    const remainderData = remainder ? remainder.map(({ layer, size, volume }) => {
        return { 
            layer: layer,
            size: size !== null && size !== undefined ? size.size : '',
            volume: volume.toFixed(1)
        }
    }) : ''

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

    return { realizationData, remainderData, realizationSum1, realizationSum2, totalSumSOM, totalSumUSD, totalSumEUR, paidSumSOM, paidSumUSD, paidSumEUR }
}