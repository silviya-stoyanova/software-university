function solve() {
  // TODO
  let inputString = document.getElementById('arr').value
  let numsArray = JSON.parse(inputString)

  numsArray = numsArray.filter((num, index) => index % 2 === 0)
  document.getElementById('result').textContent = numsArray.join(' x ')
}