export const useSort = () => {
    function sortByStatus(a, b) {
        if (a.status > b.status) {
            return 1
        } else if (a.status < b.status) {
            return -1
        } else {
            return 0
        }
    }

    return { sortByStatus }
}