export const useSort = () => {
    function sortByStatus(a, b) {
        if (a.statusPaid > b.statusPaid) {
            return 1
        } else if (a.statusPaid < b.statusPaid) {
            return -1
        } else {
            return 0
        }
    }

    return { sortByStatus }
}