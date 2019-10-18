function solve() {
  let string = [...document.getElementById('string').value]
  let char = document.getElementById('character').value
  let couter = 0
  findOccurences()

  function findOccurences() {
    string.forEach(symbol => {
      if (symbol === char) {
        couter++
      }
    })

    document.getElementById('result').textContent = `Count of ${char} is ${couter % 2 === 0 ? 'even' : 'odd'}.`
  }
}
