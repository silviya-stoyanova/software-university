function solve() {
  // TODO
  let string = document.getElementById('arr').value
  let array = JSON.parse(string)
  let replacedString = document.getElementById('str').value
  let wordToReplace = array[0].split(' ')[2].toLowerCase()

  for (let i = 0; i < array.length; i++) {
    let currStr = array[i].split(' ')

    currStr = currStr.map(x => x.toLowerCase()
      .replace(wordToReplace, replacedString))
      .join(' ')

    let newParagraph = document.createElement('p')
    newParagraph.innerHTML = currStr
    document.getElementById('result').appendChild(newParagraph)

  }
}