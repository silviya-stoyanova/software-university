function initializeTable() {
    let createLink = $('a#createLink').on('click', createRow)

    function createRow(event) {
        event.stopPropagation()
        event.preventDefault()

        let newCountry = $('#newCountryText').val()
        let newCapital = $('#newCapitalText').val()
        let newRow = $(`<tr></tr>`)
        let newTDCountry = $(`<td>${newCountry}</td>`)
        let newTDCapital = $(`<td>${newCapital}</td>`)
        let upLink = $(`<a>[Up]</a>`).on('click', moveUp)
        let downLink = $(`<a>[Down]</a>`).click(moveDown)
        let deleteLink = $(`<a>[Delete]</a>`).click(deleteIt)

        newRow.append(newTDCountry)
            .append(newTDCapital)
            .append($('<td></td>')
                .append(upLink, downLink, deleteLink))
            .appendTo($('table'))

        $('#newCountryText').val('')
        $('#newCapitalText').val('')

        console.log($('table tr').length);

        if ($('table tr').length === 3) {
            $('table tr:eq(2) td:last-child a:first-child').css('display', 'none')  // hide Up
            $('table tr:last-child td:last-child a:eq(1)').css('display', 'none')   // hide Down

        } else { //if ($('table tr').length === 3) {
            $('table tr:eq(2) td:last-child a:eq(1)').css('visibility', 'visible')   // show Down

        }
        // console.log($('table tr:eq(2) td:last-child'));
    }

    function moveUp() {
        let row = $(this).parent().parent()
        row.insertBefore(row.prev())
    }

    function moveDown() {
        let row = $(this).parent().parent()
        row.insertAfter(row.next())
    }

    function deleteIt() {
        let row = $(this).parent().parent()
        row.remove()
    }
}