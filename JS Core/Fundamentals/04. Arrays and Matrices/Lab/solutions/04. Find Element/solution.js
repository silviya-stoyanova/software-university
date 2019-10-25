function solve() {
  let number = document.getElementById('num').value
  let inputString = document.getElementById('arr').value
  let inputArray = JSON.parse(inputString)
  let index = -1
  let output = []

  inputArray = inputArray.map((el) => {
    (el.includes(number) && typeof el === 'string') ? index = el.indexOf(number) : index = -1
    output.push((index !== -1 ? `true` : `false`) + ` -> ${index}`)
  })

  document.getElementById('result').textContent = output.join(' ')
}
