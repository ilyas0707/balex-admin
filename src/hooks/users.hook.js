export const useUsers = (users) => {

    const usersData = users ? users.map(({ id, fullname, username, roles }) => {
        return { 
            id: id,
            fullname: fullname,
            username: username,
            // eslint-disable-next-line
            role: roles ? roles.map((role) => {
                if (role === 'ROLE_ACCOUNTANT') {
                    return 'Бухгалтер'
                } else if (role === 'ROLE_USER') {
                    return 'Пользователь'
                } else if (role === 'ROLE_ADMIN') {
                    return 'Админ'
                }
            }).join('-') : ''
        }
    }) : ''

    return { usersData }
}