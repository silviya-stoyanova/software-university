function solve() {
	//TO DO
	let encodeButton = document.getElementsByTagName('button')[0]
	encodeButton.onclick = sendEncodedMessage

	let decodeButton = document.getElementsByTagName('button')[1]
	decodeButton.onclick = decodeMessage

	let senderElement = document.getElementsByTagName('textarea')[0]
	let receiverElement = document.getElementsByTagName('textarea')[1]

	function sendEncodedMessage() {
		let sentMessage = [...senderElement.value]
			.map(symbol => symbol.charCodeAt(0) + 1)
			.map(char => String.fromCharCode(char))
			.join('')

		senderElement.value = ''
		receiverElement.textContent = sentMessage
	}
//	console.log('1'+senderElement.value+'2');

	function decodeMessage() {
		let receivedMessage = [...receiverElement.value]
			.map(symbol => symbol.charCodeAt(0) - 1)
			.map(char => String.fromCharCode(char))
			.join('')

		receiverElement.textContent = receivedMessage
	}
}