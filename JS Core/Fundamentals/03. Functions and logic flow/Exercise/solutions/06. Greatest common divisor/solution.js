function greatestCD() {
    // TO DO ...
    let firstNum = Number(document.getElementById('num1').value)
    let secondNum = Number(document.getElementById('num2').value)
    greatestCD()

    function greatestCD() {
        while (secondNum !== 0) {
            let oldsecondNum = secondNum
            secondNum = firstNum % secondNum
            firstNum = oldsecondNum
        }

        document.getElementById('result').textContent = firstNum
    }
}