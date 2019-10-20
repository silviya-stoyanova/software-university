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
