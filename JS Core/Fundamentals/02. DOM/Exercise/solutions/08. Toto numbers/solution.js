function solve() {
	//TO DO
	let button = document.getElementsByTagName('button')[0]
	button.onclick = revealNums
	let showAllNumbersElement = document.getElementById('allNumbers')

	function revealNums() {
		let inputNumsElement = document.getElementsByTagName('input')[0]
		let inputNums = inputNumsElement.value.split(' ').map(Number)

		if (inputNums.length === 6) {
			for (let j = 0; j < inputNums.length; j++) {
				let num = inputNums[j]

				if (num < 1 || num > 49) {
					return
				}
			}

		} else {
			return
		}

		for (let i = 1; i <= 49; i++) {
			let numberElement = document.createElement('div')
			numberElement.setAttribute('class', 'numbers')
			numberElement.innerText = `${i}`

			inputNums.map(num => {
				if (num === i) {
					numberElement.setAttribute('style', 'background: orange')
				}

			})

			showAllNumbersElement.appendChild(numberElement)
		}

		inputNumsElement.disabled = true
		button.disabled = true
	}
}