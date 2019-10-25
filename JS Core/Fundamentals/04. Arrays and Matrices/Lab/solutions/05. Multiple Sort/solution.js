function solve() {
  // TODO
  let numsStr = document.getElementById('arr').value
  let numsArr = JSON.parse(numsStr)

  let alphabeticallyNums = numsArr.sort((a, b) => a.localeCompare(b))
  numsArr = numsArr.map(Number)
  let ascendingNums = numsArr.sort((a, b) => a - b)

  let ascendingDiv = document.createElement('div')
  ascendingDiv.textContent = ascendingNums.join(', ')

  let alphabeticalDiv = document.createElement('div')
  alphabeticalDiv.textContent = alphabeticallyNums.join(', ')

  document.getElementById('result').appendChild(ascendingDiv)
  document.getElementById('result').appendChild(alphabeticalDiv)
}