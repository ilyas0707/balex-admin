export const useClients = (clients) => {

    const clientsData = clients ? clients.map(({ id, name, surName, email, phoneNumber, isActive, isActivated, documentType, documentNumber, address, country, activityStatus, balance }) => {
        return {
            id: id,
            name: name,
            surName: surName,
            email: email,
            phoneNumber: phoneNumber,
            isActive: isActive,
            isActivated: isActivated,
            documentType: documentType,
            documentNumber: documentNumber,
            address: address,
            country: country,
            activityStatus: activityStatus,
            balance: balance
        }
    }) : []

    return { clientsData }
}