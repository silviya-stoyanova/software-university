function validate() {
    // TO DO:
    document.getElementsByTagName('button')[0]
        .addEventListener('click', checkNumbers)

    function checkNumbers() {
        let rowType = 'NOT Valid'
        let numbers = Array.from(document.querySelector('#exercise input').value)

        let lastDigit = Number(numbers.pop())
        let digitsSum = 2 + 4 + 8 + 5 + 10 + 9 + 7 + 3 + 6
        numbers.map(x => digitsSum += Number(x))

        let reminder = digitsSum % 11
        reminder === 10 ? reminder = 0 : reminder = reminder // ?

        if (numbers.length === 9 && reminder === lastDigit) {
            rowType = 'Valid'
        }

        document.getElementById('response')
            .textContent = `This number is ${rowType}!`
    }
}