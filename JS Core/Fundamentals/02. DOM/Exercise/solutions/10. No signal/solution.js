function solve() {
	//TODO
	let exerciseElement = document.getElementById('exercise')

	let marginLeft = 0
	let leftMin = 1
	let leftMax = 81

	let marginTop = 0
	let topMin = 1
	let topMax = 45

	setInterval(() => {
		exerciseElement.style.position = 'absolute'
		console.log(exerciseElement.style);

		marginLeft = calculateLeftMargin()
		marginTop = calculateTopMargin()
		exerciseElement.setAttribute('style',
			`margin-left: ${marginLeft}%; margin-top: ${marginTop}vh`)
	}, 2000);

	function calculateLeftMargin() {
		return Math.floor(Math.random() * (leftMax - leftMin + 1)) + leftMin
	}

	function calculateTopMargin() {
		return Math.floor(Math.random() * (topMax - topMin + 1)) + topMin
	}
}