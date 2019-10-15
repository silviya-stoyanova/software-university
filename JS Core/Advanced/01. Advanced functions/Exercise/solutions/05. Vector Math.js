let solution = (function () {
    const add = ([xA, yA], [xB, yB]) => [xA + xB, yA + yB]
    const multiply = ([xA, yA], scalar) => [xA * scalar, yA * scalar]
    const length = ([xA, yA]) => Math.sqrt(xA ** 2 + yA ** 2)
    const dot = ([xA, yA], [xB, yB]) => xA * xB + yA * yB
    const cross = ([xA, yA], [xB, yB]) => xA * yB - yA * xB

    let commandsObj = {
        add,
        multiply,
        length,
        dot,
        cross
    }

    return commandsObj
})()

solution.add([1, 1], [1, 0])
solution.multiply([3.5, -2], 2);
solution.length([3, -4]);
solution.dot([1, 0], [0, -1]);
solution.cross([3, 7], [1, 0]);