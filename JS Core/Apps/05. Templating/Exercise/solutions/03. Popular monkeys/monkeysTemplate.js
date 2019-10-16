$(() => {
    let templateHTML = $('#monkey-template').html()
    let template = Handlebars.compile(templateHTML)
    let context = { monkeys }
    let renderedHTML = template(context)
    $('.monkeys').append(renderedHTML)
    $('.monkey button').on('click', showAdditionalInfo)
})

function showAdditionalInfo(e) {
    let monkeyEl = $(e.target).parent()
    monkeyEl.find('p').toggle()
}