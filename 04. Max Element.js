function solve(arguments) {
    let largestNum = Math.max.apply(undefined, arguments)
    console.log(largestNum)
}
solve([1, 44, 123, 33])