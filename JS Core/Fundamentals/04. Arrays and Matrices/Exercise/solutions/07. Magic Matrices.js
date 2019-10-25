function solve(input) {
    let magic = true
    let rowSum = 0
    let prevRowSum = 0
    let colSum = 0
    let prevColSum = 0

    for (let row = 0; row < input.length; row++) {
        for (let col = 0; col < input[row].length; col++) {
            let num = input[row][col]
            rowSum += num
        }
        row === 0 ? prevRowSum = rowSum : (prevRowSum !== rowSum ? magic = false : '')
        rowSum = 0
    }

    for (let col = 0; col < input.length; col++) {
        for (let row = 0; row < input.length; row++) {
            let num = input[col][row]
            colSum += num
        }
        col === 0 ? prevColSum = colSum : (prevColSum !== colSum ? magic = false : '')
        colSum = 0
    }

    if (rowSum !== colSum) {
        magic = false
    }

    console.log(magic);
}
solve([
    [4, 5, 6],
    [6, 5, 4],
    [5, 5, 5]
])