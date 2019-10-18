function getNext() {
    // TODO ...
    let number = Number(document.getElementById('num').value)
    let sequence = [number]
    getNext()

    function getNext() {
        while (number !== 1) {
            if (number % 2 === 0) {
                number /= 2

            } else {
                number = (3 * number) + 1
            }

            sequence.push(number)
        }

        document.getElementById('result').textContent = sequence.join(' ') + ' '
    }

}