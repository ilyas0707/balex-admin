export const useTest = () => {
    const income = [
        { billNumber: '0789', fullname: 'Айбек Айбекович', carNumber: 'AC56789', volume: 3500, price: 10, date: new Date() },
        { billNumber: '0789', fullname: 'Айбек Айбекович', carNumber: 'AC56789', volume: 2500, price: 10, date: new Date() },
        { billNumber: '0789', fullname: 'Айбек Айбекович', carNumber: 'AC56789', volume: 1500, price: 10, date: new Date() },
    ]
    const outcome = [
        { machine: 'A1', volume: 3500, date: new Date() },
        { machine: 'B2', volume: 2500, date: new Date() },
        { machine: 'C3', volume: 1500, date: new Date() },
    ]
    const leftover = [
        { volume: 3500 },
        { volume: 2500 },
        { volume: 1500 },
    ]
    const manufacturing = [
        { layer: '1', size: 35, volume: 3500 },
        { layer: '2', size: 25, volume: 2500 },
        { layer: '3', size: 15, volume: 1500 },
    ]
    const realization = [
        { layer: '1', size: 35, volume: 3500, client: 'Айбек Айбекович', price: 10, date: new Date() },
        { layer: '2', size: 25, volume: 2500, client: 'Айбек Айбекович', price: 10, date: new Date() },
        { layer: '3', size: 15, volume: 1500, client: 'Айбек Айбекович', price: 10, date: new Date() },
    ]

    return { income, outcome, leftover, manufacturing, realization }
}