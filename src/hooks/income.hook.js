export const useIncome = (income) => {

    const incomeData = income ? income.map(({ id, description, amount, paymentMethod, client, dateCreated }) => {
        let dateFormatted = new Date(dateCreated)
        return {
            id: id,
            description: description,
            amount: amount, 
            paymentMethod: paymentMethod, 
            client: client,
            date: `${dateFormatted.getDate()}/${dateFormatted.getMonth() + 1}/${dateFormatted.getFullYear()}`,
            sortDate: dateFormatted
        }
    }) : ''

    return { incomeData }
}