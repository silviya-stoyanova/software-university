function solve() {
    //TO DO...
    let allButtons = Array.from(document.getElementsByTagName('button'))

    allButtons[0].onclick = chopNumber
    allButtons[1].onclick = diceNumber
    allButtons[2].onclick = spiceNumber
    allButtons[3].onclick = bakeNumber
    allButtons[4].onclick = filletNumber

    function chopNumber() {
        let inputNumber = document.getElementsByTagName('input')[0].value
        let number = document.getElementById('output').textContent
        number.length === 0 ? number = inputNumber : number = number

        number = Number(number) / 2
        document.getElementById('output').textContent = number
    }

    function diceNumber() {
        let inputNumber = document.getElementsByTagName('input')[0].value
        let number = document.getElementById('output').textContent
        number.length === 0 ? number = inputNumber : number = number

        number = Math.sqrt(Number(number))
        document.getElementById('output').textContent = number
    }

    function spiceNumber() {
        let inputNumber = document.getElementsByTagName('input')[0].value
        let number = document.getElementById('output').textContent
        number.length === 0 ? number = inputNumber : number = number

        number = Number(number) + 1
        document.getElementById('output').textContent = number
    }

    function bakeNumber() {
        let inputNumber = document.getElementsByTagName('input')[0].value
        let number = document.getElementById('output').textContent
        number.length === 0 ? number = inputNumber : number = number

        number = Number(number) * 3
        document.getElementById('output').textContent = number
    }

    function filletNumber() {
        let inputNumber = document.getElementsByTagName('input')[0].value
        let number = document.getElementById('output').textContent
        number.length === 0 ? number = inputNumber : number = number

        number = Number(number) * 0.8
        document.getElementById('output').textContent = number
    }
}