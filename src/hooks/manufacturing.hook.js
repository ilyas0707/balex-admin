export const useManufacturing = (manufacturing, remainder, outcome) => {

    const manufacturingData = manufacturing ? manufacturing.map(({ id, stoneMachine, layer, dimension, volume, square, date }) => {
        let dateFormatted = new Date(date)
        return {
            id: id, 
            stoneMachine: stoneMachine !== null && stoneMachine !== undefined ? stoneMachine.name : '',
            layer: layer, 
            dimension: dimension !== null && dimension !== undefined ? dimension.size : '', 
            volume: volume.toFixed(1),
            square: square.toFixed(1),
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

    let manufacturingSum1 = []
    let manufacturingSum2 = []

    let outcomeSum1 = []
    let outcomeSum2 = []

    if (manufacturing) {
        for (let i = 0; i < manufacturing.length; i++) {
            if (manufacturing[i].layer === '1') {
                manufacturingSum1[i] = manufacturing[i].square
            } else if (manufacturing[i].layer === '2') {
                manufacturingSum2[i] = manufacturing[i].square
            }
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

    return { manufacturingData, remainderData, manufacturingSum1, manufacturingSum2, outcomeSum1, outcomeSum2 }
}