function solve() {
  // TODO
  let inputString = document.getElementById('arr').value
  let inputArray = JSON.parse(inputString)

  inputArray = inputArray.map(el => el.split('').reverse())
  inputArray = inputArray.map(el => (el[0].toUpperCase() + el.slice(1).join('')))
  document.getElementById('result').textContent = inputArray.join(' ')
}