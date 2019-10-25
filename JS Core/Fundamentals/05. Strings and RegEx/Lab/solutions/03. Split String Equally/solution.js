function solve() {
  let string = document.getElementById('str').value
  let number = Number(document.getElementById('num').value)
  string = string.split('')
  let output = string

  for (let i = 0; i < string.length; i++) {

    if ((i + 1) % (number + 1) === 0) { // когато достигне желания брой елементи
      output.splice(i, 0, ' ')
    }
  }

  output = output.join('')
    .split(' ')

  if (output[output.length - 1].length < output[0].length) {
    let difference = output[0].length - output[output.length - 1].length
    let neededLetters = string.slice(0, difference)
    output[output.length - 1] += neededLetters.join('')

  } else if (number > output.length) {
    let difference = number - string.length
    let neededLetters = output[0].slice(0, difference)
    output[output.length - 1] += neededLetters
  }

  document.getElementById('result').textContent = output.join(' ')
}
