export const useRealization = (realization, remainder) => {

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

    const remainderData = remainder ? remainder.map(({ layer, volume }) => {
        return { 
            layer: layer, 
            volume: volume 
        }
    }) : ''

    return { realizationData, remainderData }
}