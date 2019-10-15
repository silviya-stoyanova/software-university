let solve = (function () {
    let sum = 0

    function add(number) {
        sum += number
        console.log(sum)
        return add  // you need to return it's value to be able to call it like this: solve(1)(6)(-3)
    }

    // for judge only: ! ///////////
    add.toString = function () {
        return sum
    } //////////////////////////////

    return add  // always return a value inside an IIFE
})()
solve(1)(6)(-3)