function attachEvents() {
    $('a.button').on('click', makeClass)

    function makeClass(event) {
        // event.preventDefault()
        // event.stopPropagation()
        $('.selected').removeClass('selected')
        $(event.target).addClass('selected')
    }
}
