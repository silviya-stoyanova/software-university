function solve() {
  let inputString = document.getElementById('arr').value
  let inputArray = JSON.parse(inputString)

  let validatingRegEx = /^([A-Z][a-z]* [A-Z][a-z]*) (\+359([ -])\d\3\d{3}\3\d{3}) (([a-z]+|[0-9])@[a-z]+\.[a-z]+)/

  for (let string of inputArray) {
    let match = string.match(validatingRegEx)
    let resultElement = document.getElementById('result')

    if (match !== null) {
      let name = match[1]
      let phone = match[2]
      let mail = match[4]

      let nameParagraph = document.createElement('p')
      nameParagraph.innerHTML = `Name: ${name}`

      let phoneParagraph = document.createElement('p')
      phoneParagraph.innerHTML = `Phone Number: ${phone}`

      let mailParagraph = document.createElement('p')
      mailParagraph.innerHTML = `Email: ${mail}`

      resultElement.appendChild(nameParagraph)
      resultElement.appendChild(phoneParagraph)
      resultElement.appendChild(mailParagraph)

    } else {
      let invalidDataParagraph = document.createElement('p')
      invalidDataParagraph.innerHTML = 'Invalid data'
      resultElement.appendChild(invalidDataParagraph)
    }

    let separatingParagraph = document.createElement('p')
    separatingParagraph.innerHTML = '- - -'
    resultElement.appendChild(separatingParagraph)
  }
}