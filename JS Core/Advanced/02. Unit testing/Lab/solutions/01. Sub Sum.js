function subsum(array, startIndex, endIndex) {
    if (!Array.isArray(array)) {
        return NaN
    }

    if (startIndex < 0) {
        startIndex = 0
    }

    if (endIndex > array.length - 1) {
        endIndex = array.length - 1
    }

    array = array.map(Number)
        .slice(startIndex, endIndex + 1)
        .reduce((acc, num) => acc + num, 0)

    return array // ??
}
console.log(subsum(['10', '20', '30', '40', '50', '60'], 3, 300))
console.log(subsum([1.1, 2.2, 3.3, 4.4, 5.5], -3, 1))
console.log(subsum([10, 'twenty', 30, 40], 0, 2))
console.log(subsum([], 1, 2))
console.log(subsum('text', 0, 2))