function solve() {
    let [firstNum, secondNum, result, resultElement] = ''

    return {
        init(selector1, selector2, resultSelector) {
            firstNum = document.querySelector(selector1)
            secondNum = document.querySelector(selector2)
            resultElement = document.querySelector(resultSelector)
        },
        add() {
            result = Number(firstNum.value) + Number(secondNum.value)
            resultElement.value = result
        },
        subtract() {
            result = Number(firstNum.value) - Number(secondNum.value)
            resultElement.value = result
        }
    }
}