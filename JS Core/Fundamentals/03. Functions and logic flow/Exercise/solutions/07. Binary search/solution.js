function binarySearch() {
    // TODO ...
    let inputArray = document.getElementById('arr').value
    inputArray = inputArray.split(', ')
    inputArray = inputArray.map(num => Number(num))
    let number = Number(document.getElementById('num').value)

    let numIndex = -1
    binarySearch()

    function binarySearch() {
        inputArray.map((num, index) => {
            if (num === number) {
                numIndex = index
            }
        })

        document.getElementById('result').textContent =
            numIndex !== -1 ? `Found ${number} at index ${numIndex}`
                : `${number} is not in the array`
    }
}