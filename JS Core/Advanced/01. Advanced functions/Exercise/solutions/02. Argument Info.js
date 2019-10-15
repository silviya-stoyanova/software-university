function solve() {
    let allInputArguments = arguments
    let argumentsInfo = {}

    for (let argument of allInputArguments) {
        let type = typeof argument
        argumentsInfo[type] ? argumentsInfo[type]++ : argumentsInfo[type] = 1
        console.log(`${type}: ${argument}`)
    }

    let sortDescending = function (a, b) {
        return b - a
    }

    let sortFunctions = {
        descendingOrder: sortDescending
    }

    Object.entries(argumentsInfo)
        .sort((a, b) => sortFunctions.descendingOrder)
        .map(([type, value]) => console.log(`${type}: ${value}`))
}
solve('cat', 42, function () { console.log('Hello world!'); })