export const useSortByDate = () => {
    function sortByDate(a, b) {
        return new Date(b.sortDate) - new Date(a.sortDate)
    }

    return { sortByDate }
}