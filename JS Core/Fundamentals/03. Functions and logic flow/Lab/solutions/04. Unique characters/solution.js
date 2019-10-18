function solve() {
  let string = Array.from(document.getElementById('string').value)
  let uniqueChars = ''  
  extractUniqueChars(string)

  function extractUniqueChars(string) {
    for (let i = 0; i < string.length; i++) {
      if (!uniqueChars.includes(string[i])) {
        uniqueChars += string[i]

      } else {
        if (string[i].match(/\s/)) {
          uniqueChars += string[i].match(/\s/)
        }
      }
    }

    document.getElementById('result').innerHTML = uniqueChars
  }
}
