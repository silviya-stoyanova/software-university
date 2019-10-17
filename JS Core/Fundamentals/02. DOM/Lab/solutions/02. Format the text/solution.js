function solve() {
  //TO DO
  let existingElements = document.getElementById('exercise')
  let currParagraphElement = document.getElementById('input')
  let currParagraph = currParagraphElement.innerText
  let sentences = currParagraph.split('.').filter(x => x !== '')

  let outputElement = document.createElement('div')
  outputElement.setAttribute('id', 'output')
  let newParagraph

  for (let i = 0; i < sentences.length; i++) {

    if (i % 3 === 0) {
      // create new child here: <div id="exercise">
      newParagraph = document.createElement('p')
      outputElement.appendChild(newParagraph)
    }

    newParagraph.textContent += sentences[i] + '.'
  }

  existingElements.replaceChild(outputElement, currParagraphElement)
}