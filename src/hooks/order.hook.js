export const useOrder = (order) => {

    const orderData = order ? order.map(({ id, description, priceFromInvoice, total, trackNumber, volume, volumeUnit, user, dateTime }) => {
        let dateFormatted = new Date(dateTime)
        return {
            id: id,
            trackNumber: trackNumber,
            volume: volume, 
            volumeUnit: volumeUnit,
            description: description,
            priceFromInvoice: priceFromInvoice,
            total: total,
            user: user,
            date: `${dateFormatted.getDate()}/${dateFormatted.getMonth() + 1}/${dateFormatted.getFullYear()}`,
            sortDate: dateFormatted
        }
    }) : ''

    return { orderData }
}