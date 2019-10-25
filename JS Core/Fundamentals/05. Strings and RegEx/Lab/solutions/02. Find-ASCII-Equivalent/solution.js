function solve() {
  let string = document.getElementById('str').value
  let lastWord = ''

  string = string.split(/\s+/)
    .map(word => {

      if (isNaN(word)) {
        word = word.split('')
          .map(el => el.charCodeAt(0))
          .join(' ')

        let newParagraph = document.createElement('p')
        newParagraph.textContent = word
        document.getElementById('result').appendChild(newParagraph)

      } else {
        lastWord += String.fromCharCode(word)
      }

    })


  let lastParagraph = document.createElement('p')
  lastParagraph.textContent = lastWord
  document.getElementById('result').appendChild(lastParagraph)
}