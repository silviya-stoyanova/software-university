function solve() {
  let startingNum = Number(document.getElementById('firstNumber').value)
  let endingNum = Number(document.getElementById('secondNumber').value)
  let firstStr = document.getElementById('firstString').value
  let secondStr = document.getElementById('secondString').value
  let thirdStr = document.getElementById('thirdString').value

  function printNums() {
    for (let i = startingNum; i <= endingNum; i++) {
      let paragraphElement = document.createElement('p')
      let output = `${i}`

      if (i % 3 === 0 && i % 5 === 0) {
        output += ` ${firstStr}-${secondStr}-${thirdStr}`

      } else if (i % 3 === 0) {
        output += ` ${secondStr}`

      } else if (i % 5 === 0) {
        output += ` ${thirdStr}`
      }

      paragraphElement.textContent = output
      document.getElementById('result').appendChild(paragraphElement)
    }
  }

  printNums()
}
