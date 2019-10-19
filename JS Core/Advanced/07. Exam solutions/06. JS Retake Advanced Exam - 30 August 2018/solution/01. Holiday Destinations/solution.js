function addDestination() {
    let city = $('#input input').eq(0).val()
    let country = $('#input input').eq(1).val()
    let season = $('#seasons option:selected').text()

    if (city && country) {
        let newRow = $('<tr>')
        let destinationTd = $('<td>')
        let seasonTd = $('<td>')

        destinationTd.text(`${city}, ${country}`)
        seasonTd.text(season)

        newRow.append(destinationTd)
            .append(seasonTd)
            .appendTo($('#destinationsList'))

        let currSeaseonDests = $(`#summaryBox #${season.toLowerCase()}`).val()
        currSeaseonDests++
        $(`#summaryBox #${season.toLowerCase()}`).val(currSeaseonDests)

        $('#input input').eq(0).val('')
        $('#input input').eq(1).val('')
        $('#seasons option:selected')[0].selected = false
    }
}