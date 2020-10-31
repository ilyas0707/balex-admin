export const useManufacturing = (manufacturing, remainder) => {

    const manufacturingData = manufacturing ? manufacturing.map(({ layer, dimension, volume, square, date }) => {
        let dateFormatted = new Date(date)
        return { 
            layer: layer, 
            dimension: dimension, 
            volume: volume,
            square: square,
            date: `${dateFormatted.getDate()}/${dateFormatted.getMonth() + 1}/${dateFormatted.getFullYear()}` 
        }
    }) : ''

    const remainderData = remainder ? remainder.map(({ layer, volume }) => {
        return { 
            layer: layer, 
            volume: volume 
        }
    }) : ''

    return { manufacturingData, remainderData }
}