function create(words) {
   $(words).each((i, string) => createElements(string))

   function createElements(string) {
      let newDiv = $('<div>')
      newDiv.append($('<p>')
         .text(string)
         .css('display', 'none'))
         .on('click', showParagraph)

      $('#content').append(newDiv)
   }

   function showParagraph(e) {
      let $paragraphEl = $(e.target).children().eq(0)
      $paragraphEl.css('display', 'block')
   }
}