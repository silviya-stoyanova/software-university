function solve() {
  // TO DO
  let string = Array.from(document.getElementById('string').value)
  let uniqueChars = ''
  extractUniqueChars()

  function extractUniqueChars() {
    for (let i = 0; i < string.length; i++) {
      if (!uniqueChars.includes(string[i])) {
        uniqueChars += string[i]
      }
    }



  }

  console.log(uniqueChars)
}