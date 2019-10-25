function solve() {
  let inputArray = document.getElementById('arr').value
  let inputNums = JSON.parse(inputArray)

  inputNums = inputNums.map(x => x *= inputNums.length)
    .forEach((num, index) => {
      let newParagraph = document.createElement('p')
      newParagraph.textContent = `${index} -> ${num}`
      document.getElementById('result').appendChild(newParagraph)
    })
}
