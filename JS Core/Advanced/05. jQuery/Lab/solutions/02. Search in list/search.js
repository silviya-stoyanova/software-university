function search() {
   let input = $('#searchText').val()

   let matches = $('ul#towns li')
      .css('font-weight', 'normal')
      .filter((index, li) => li.textContent.includes(input))
      .css('font-weight', 'bold')

   $('#result').text(`${matches.length} matches found.`)
}
