function solve(commands) {
    let ifii = (function () {
        let outputString = ''

        return {
            append: (str) => outputString += str,
            removeStart: (num) => outputString = outputString.substr(Number(num)),
            removeEnd: (num) => outputString = outputString.substr(0, outputString.length - Number(num)),
            print: () => console.log(outputString)
        }
    })()

    for (let input of commands) {
        let [command, inputString] = input.split(' ')
        ifii[command](inputString)      // така се подава инфо на ifii
    }
}

solve(['append hello',
    'append again',
    'removeStart 3',
    'removeEnd 4',
    'print'])