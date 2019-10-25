function solve() {
  let text = document.getElementById('str1').value
  let givenCase = document.getElementById('str2').value

  text = text.split(/\s+/)
    .map(word => word.toLowerCase())
    .map(word => word[0].toUpperCase() + word.slice(1))
    .join('')

  if (givenCase === 'Camel Case') {
    text = text[0].toLowerCase() + text.slice(1)

  } else if (givenCase !== 'Pascal Case') {
    text = ['Error!']
  }

  document.getElementById('result').textContent = text
}
