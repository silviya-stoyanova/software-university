function solve(array) {
    let rotations = Number(array.pop())

    if (rotations % array.length !== 0) {

        for (let i = 0; i < rotations; i++) {
            let lastEl = array.pop()
            array.unshift(lastEl)
        }
    }

    console.log(array.join(' '));
}
solve(['Banana',
    'Orange',
    'Coconut',
    'Apple',
    '15'])