function solve() {
  let inputDegrees = Number(document.getElementById('num1').value)
  let inputUnit = document.getElementById('type').value.toLowerCase()
  let resultElement = document.getElementById('result')
  convertTemperature()

  function convertTemperature() {
    let result = Number

    if (inputUnit === 'fahrenheit') {
      result = Math.round((inputDegrees - 32) / 1.8)

    } else if (inputUnit === 'celsius') {
      result = Math.round(inputDegrees * 1.8 + 32)

    } else {
      result = 'Error!'
    }

    resultElement.textContent = result
  }
}
