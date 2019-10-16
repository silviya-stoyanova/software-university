$(() => {
    renderCatTemplate();

    function renderCatTemplate() {
        // Render cat template and attach events
        let html = $.get('./catTemplate.hbs')
        html.then(templateHTML => {
            let template = Handlebars.compile(templateHTML)
            let context = { cats }
            let renderedHTML = template(context)
            $('#allCats').append(renderedHTML)
            $('.btn').on('click', showStatusCode)
        })
    }

    function showStatusCode(e) {
        let extraInfoDiv = $(e.target).siblings()
        extraInfoDiv.toggle()
        let button = extraInfoDiv.prev()

        button.text() === 'Show status code'
            ? button.text('Hide status code')
            : button.text('Show status code')
    }
})
