// function solve() { // for judge
$('#btnLoad').click(onBtnLoad)
$('#btnCreate').click(onBtnCreate)

function onBtnLoad() {
    let url = 'https://phonebook-nakov.firebaseio.com/phonebook.json'
    let response = $.get(url)
    response.then((contacts) => loadContacts(contacts))
        .catch(err => $('#phonebook').append($('<li>').text('Error')))
}

function loadContacts(contacts) {
    $('#phonebook').empty()

    for (let id in contacts) {
        let contactInfo = contacts[id]
        let deleteBtn = $('<button>')
        deleteBtn.text('Delete')
            .click(deleteContact.bind(this, id))

        let li = $('<li>')
        li.text(`${contactInfo.person}: ${contactInfo.phone} `)
            .append(deleteBtn)
            .appendTo($('#phonebook'))
    }
}

function deleteContact(id) {
    $.ajax({
        method: 'DELETE',
        url: `https://phonebook-nakov.firebaseio.com/phonebook/${id}.json`
    })
        .then(onBtnLoad)
        .catch(err => $('#phonebook').append($('<li>').text('Error')))
}

function onBtnCreate() {
    let person = $('#person').val()
    let phone = $('#phone').val()
    let data = JSON.stringify({ person, phone })

    $.post('https://phonebook-nakov.firebaseio.com/phonebook.json', data)
        .then(onBtnLoad)
        .catch(err => $('#phonebook').append($('<li>').text('Error')))

    $('#person').val('')
    $('#phone').val('')
}
// } // for judge