function attachEvents() {
    $('#submit').on('click', submitMessage)
    $('#refresh').on('click', refreshMessages)
}

function submitMessage() {
    let author = $('#author').val()
    let content = $('#content').val()
    let timestamp = Date.now()

    let newMessage = JSON.stringify({ author, content, timestamp })
    $.ajax({
        method: 'POST',
        url: `https://messagesz.firebaseio.com/.json`,
        data: newMessage
    })
        .then(id => refreshMessages)     
}

function refreshMessages() {
    let response = $.get(`https://messagesz.firebaseio.com/.json`)
    response.then((messages) => loadMessages(messages))
}

function loadMessages(messages) {
    $('#messages').empty()
    console.log(messages);
    let allMessages = $('#messages').text()

    for (let id in messages) {
        allMessages += `${messages[id].author}: ${messages[id].content}\n`
    }
    $('#messages').text(allMessages)
}
