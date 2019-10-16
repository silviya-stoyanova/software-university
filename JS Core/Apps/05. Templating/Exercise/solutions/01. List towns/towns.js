function attachEvents() {
    $('#btnLoadTowns').on('click', getTowns)
}

function getTowns() {
    towns = $('#towns').val().split(', ')
    renderHTML(towns)
}

function renderHTML(towns) {
    let html = $('#towns-template').html()
    let template = Handlebars.compile(html)
    let context = { towns }
    let renderedHTML = template(context)
    $('#root').append(renderedHTML)
}