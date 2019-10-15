function extractText() {
   let allListItems = $('ul#items li')
      .toArray()
      .map(li => li.textContent)
      .join(', ')

   $('#result').append(allListItems)
}
