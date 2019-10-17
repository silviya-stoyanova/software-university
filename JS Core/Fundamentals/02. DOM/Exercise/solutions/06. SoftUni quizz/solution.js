function solve() {
	//TO DO
	let rightAnswers = 0
	let currSection = 0
	let buttons = document.getElementsByTagName('button')

	let softUniYearRadios = document.getElementsByName('softUniYear')
	let firstButton = buttons[0]
	firstButton.onclick = checkAnswer

	let popularNameRadios = document.getElementsByName('popularName')
	let secondButton = buttons[1]
	secondButton.onclick = checkAnswer

	let softUniFounderRadios = document.getElementsByName('softUniFounder')
	let thirdButton = buttons[2]
	thirdButton.onclick = checkAnswer

	function checkAnswer() {
		let checkedRadio = false

		if (currSection === 0) {
			[...softUniYearRadios].map(answer => {
				if (answer.checked === true) {
					if (answer.value === '2013') {
						rightAnswers++
					}
					checkedRadio = true
				}
			})

		} else if (currSection === 1) {
			[...popularNameRadios].map(answer => {
				if (answer.checked === true) {
					if (answer.value === 'Pesho') {
						rightAnswers++
					}
					checkedRadio = true
				}
			})

		} else if (currSection === 2) {
			[...softUniFounderRadios].map(answer => {
				if (answer.checked === true) {
					if (answer.value === 'Nakov') {
						rightAnswers++
					}
					checkedRadio = true
					getResults()
				}
			})
		}
		showNextSection(checkedRadio)
	}

	function showNextSection(checkedRadio) {
		if (checkedRadio) {
			let nextSection =
				document.getElementsByTagName('section')[++currSection]
			nextSection.setAttribute('style', 'display: block')
		}
	}

	function getResults() {
		let result = ''

		if (rightAnswers === 3) {
			result = 'You are recognized as top SoftUni fan!'

		} else {
			result = `You have ${rightAnswers} right answers`
		}

		document.getElementById('result').innerText = result
	}
}