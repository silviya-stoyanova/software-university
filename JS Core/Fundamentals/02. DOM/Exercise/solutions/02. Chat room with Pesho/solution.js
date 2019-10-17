function solve() {
    //TO DO
    let myButton = document.getElementsByName('myBtn')[0]
    myButton.onclick = sendMyMessage

    let peshoButton = document.getElementsByName('peshoBtn')[0]
    peshoButton.onclick = sendPeshoMessage

    let senderNameElement = document.createElement('span')
    let messageElement = document.createElement('p')
    let currMessageContainer = document.createElement('div')

    function sendMyMessage() {
        let myMessageElement = document.getElementById('myChatBox')
        let myMessage = myMessageElement.value

        senderNameElement.textContent = 'Me'
        messageElement.textContent = myMessage
        currMessageContainer.setAttribute('style', `text-align: left`)
        myMessageElement.value = ''
        writeChronology()
    }

    function sendPeshoMessage() {
        let peshoMessageElement = document.getElementById('peshoChatBox')
        let peshoMessage = peshoMessageElement.value

        senderNameElement.textContent = 'Pesho'
        messageElement.textContent = peshoMessage
        currMessageContainer.setAttribute('style', `text-align: right`)
        peshoMessageElement.value = ''
        writeChronology()
    }

    function writeChronology() {
        currMessageContainer.appendChild(senderNameElement)
        currMessageContainer.appendChild(messageElement)

        console.log(currMessageContainer);
        let chatChronology = document.getElementById('chatChronology')
        chatChronology.appendChild(currMessageContainer)
    }
}