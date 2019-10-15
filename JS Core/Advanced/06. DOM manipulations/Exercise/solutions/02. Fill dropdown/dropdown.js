function addItem() {
    let item = $('#newItemText').val()
    let value = $('#newItemValue').val()

    let newOptionElement = $('<option>')
    newOptionElement.text(item)
    newOptionElement.val(value)
    newOptionElement.appendTo($('#menu'))
    $('#newItemText').val('')
    $('#newItemValue').val('')
}
