function solve() {
	//to do
	let createTitleElement = document.getElementById('createTitle')
	let createTitle = createTitleElement.value
	let createContentElement = document.getElementById('createContent')
	let createContent = createContentElement.value

	if (createTitle.length > 0 && createContent.length > 0) {
		let titleElement = document.createElement('h3')
		titleElement.textContent = createTitle

		let contentElement = document.createElement('p')
		contentElement.textContent = createContent

		let article = document.createElement('article')
		article.appendChild(titleElement)
		article.appendChild(contentElement)

		let articles = document.getElementById('articles').appendChild(article)
		createTitleElement.value = ''
		createContentElement.value = ''
	}
}