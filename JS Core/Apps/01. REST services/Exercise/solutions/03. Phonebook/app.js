function attachEvents() {
    document.getElementById('btnLoad').addEventListener('click', loadContacts)
    document.getElementById('btnCreate').addEventListener('click', createContact)
}

function loadContacts() {
    let url = 'https://phonebook-nakov.firebaseio.com/phonebook.json'
    document.getElementById('phonebook').innerHTML = ''

    fetch(url)
        .then(res => res.json())
        .then(res => {

            if (res !== null) {
                Object.entries(res)
                    .map(kvpContact => {
                        let li = document.createElement('li')
                        li.textContent = `${kvpContact[1].person}: ${kvpContact[1].phone}`

                        let delBtn = document.createElement('button')
                        delBtn.textContent = 'Delete'

                        delBtn.addEventListener('click', function () {
                            delContact(kvpContact[0])
                        })

                        li.append(delBtn)
                        document.getElementById('phonebook').append(li)
                    })
            }
        })
}

function createContact() {
    let baseUrl = 'https://phonebook-nakov.firebaseio.com/phonebook.json'
    let person = document.getElementById('person').value
    let phone = document.getElementById('phone').value

    if (person && phone) {
        let contact = { person, phone }

        fetch(baseUrl, {
            method: 'POST',
            body: JSON.stringify(contact),
        })
            .then(() => {
                document.getElementById('person').value = ''
                document.getElementById('phone').value = ''
                loadContacts()
            })
    }
}

function delContact(id) {
    let url = `https://phonebook-nakov.firebaseio.com/phonebook/${id}.json`

    fetch(url, {
        method: 'DELETE'
    }).then(() => {
        loadContacts()
    })
}

attachEvents();