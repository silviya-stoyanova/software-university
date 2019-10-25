function solve(array) {
    let output = [array[0]]

    for (let i = 1; i < array.length; i++) {
        if (array[i] >= output[output.length - 1]) {
            output.push(array[i])
        }
    }

    console.log(output.join('\n'))
}
solve([
    1,
    3,
    8,
    4,
    10,
    12,
    3,
    2,
    24])