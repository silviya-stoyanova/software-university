function attachEvents() {
	$('ul#items li').on('click', clickTown)
	$('#showTownsButton').click(showTowns)

	function clickTown(event) {
		let town = $(this)
		if (typeof town.attr('data-selected') === 'undefined') {
			town.attr('data-selected', true)
				.css('background', '#DDD')
		} else {
			town.removeAttr('data-selected')
				.css('background', 'none')
		}
	}

	function showTowns() {
		console.log($('#items li[data-selected="true"]'))
		let towns = $('#items li[data-selected="true"]')
		$('#selectedTowns')
			.append(towns.toArray()
				.map(town => town.textContent)
				.join(', '))
	}
}
