function solve() {
  let firstNum = Number(document.getElementById('num1').value)
  let secondNum = Number(document.getElementById('num2').value)
  let resultElement = document.getElementById('result')
  printTable(firstNum, secondNum)

  function printTable(firstNum, secondNum) {
    if (firstNum > secondNum) {
      return resultElement.innerHTML = 'Try with other numbers.'
    }

    for (let i = firstNum; i <= secondNum; i++) {
      let ouptutParagraph = document.createElement('p')
      ouptutParagraph.innerHTML = `${i} * ${secondNum} = ${i * secondNum}`
      resultElement.appendChild(ouptutParagraph)
    }
  }
}
