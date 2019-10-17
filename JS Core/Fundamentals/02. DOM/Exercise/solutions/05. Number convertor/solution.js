function solve() {
    //TO DO
    let selectMenuToElement = document.getElementById('selectMenuTo')
    let toBinary = selectMenuToElement.getElementsByTagName('option')[0]
    toBinary.value = 'binary'
    toBinary.text = 'Binary'

    let toHexadecimal = document.createElement('option')
    toHexadecimal.value = 'hexadecimal'
    toHexadecimal.text = 'Hexadecimal'
    // let toHexadecimal = new Option('Hexadecimal', 'hexadecimal')
    selectMenuToElement.appendChild(toHexadecimal)

    let convertButton = document.getElementsByTagName('button')[0]
    convertButton.onclick = convert

    function convert() {
        let decimalNum = Number(document.getElementById('input').value)
        let resultNum = new Array
        let outputUnit

        Array.from(selectMenuToElement).map(unit => {
            if (unit.selected === true) {
                return outputUnit = unit.value
            }
        })

        if (outputUnit === 'binary') {
            while (decimalNum > 0) {
                resultNum.push(decimalNum % 2)
                decimalNum = parseInt(decimalNum / 2)
            }

        } else if (outputUnit === 'hexadecimal') {
            while (decimalNum > 0) {
                let remainder = decimalNum % 16

                if (remainder === 10) {
                    remainder = 'A'
                } else if (remainder === 11) {
                    remainder = 'B'
                } else if (remainder === 12) {
                    remainder = 'C'
                } else if (remainder === 13) {
                    remainder = 'D'
                } else if (remainder === 14) {
                    remainder = 'E'
                } else if (remainder === 15) {
                    remainder = 'F'
                }

                resultNum.push(remainder)
                decimalNum = parseInt(decimalNum / 16)
            }
        }

        resultNum = resultNum.reverse().join('')
        document.getElementById('result').value = resultNum
    }
}