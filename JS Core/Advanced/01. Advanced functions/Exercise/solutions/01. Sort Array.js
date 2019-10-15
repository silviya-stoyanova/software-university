function solve(numbers, orderType) {
    function orderAscending(a, b) {
        return a - b
    }

    function orderDescending(a, b) {
        return b - a
    }

    let sortingObj = {
        asc: orderAscending,
        desc: orderDescending
    }

    return numbers.sort(sortingObj[orderType])
}

solve([14, 7, 17, 6, 8], 'asc')