function addSticker() {
    let title = $('.title').val()
    let content = $('.content').val()

    if (title && content) {
        let $closeBtn = $('<a>')
        let newNote = $('<li>')
            .append($closeBtn
                .text('x')
                .addClass('button')
                .click(deleteNote))
            .append($('<h2>').text(title))

            // In HTML5, the <hr> tag defines a thematic break.
            // In HTML 4.01, the <hr> tag represents a horizontal rule.
            // However, the <hr> tag may still be displayed as a horizontal rule in visual browsers, but is now defined in semantic terms, rather than presentational terms.
            .append($('<hr>'))

            .append($('<p>').text(content))
            .addClass('note-content')
            .appendTo($('#sticker-list'))

        $('.title').val('')
        $('.content').val('')
    }

    function deleteNote(e) {
        let noteParent = $(e.target).parent().remove()
    }
}