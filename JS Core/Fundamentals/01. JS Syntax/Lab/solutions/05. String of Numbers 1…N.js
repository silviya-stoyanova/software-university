function solveStringOfNumbers(number) {
    number = Number(number)
    let output = ``

    for (let i = 1; i <= number; i++) {
        output += i
    }

    console.log(output);
}
solveStringOfNumbers('11')