function attachEvents() {
    document.getElementById('submit').onclick = sendMsg
    document.getElementById('refresh').onclick = refreshMsgs
}

function sendMsg() {
    let author = document.getElementById('author').value
    let content = document.getElementById('content').value
    let message = JSON.stringify({ author, content })

    let url = 'https://rest-messanger.firebaseio.com/messanger.json'
    fetch(url, {
        method: 'POST',
        body: message

    }).then(res => {
        document.getElementById('author').value = ''
        document.getElementById('content').value = ''
    })
}

function refreshMsgs() {
    let url = 'https://rest-messanger.firebaseio.com/messanger.json'
    document.getElementById('messages').value = ''
    let messages = ''

    fetch(url)
        .then(res => res.json())
        .then(res => {

            Object.entries(res)
                .map(r => messages += `${r[1].author}: ${r[1].content}\n`)

            document.getElementById('messages').value = messages
        })
}
attachEvents();