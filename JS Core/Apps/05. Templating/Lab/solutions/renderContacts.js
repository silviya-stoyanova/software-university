$(() => {
    let contactsListHTML = $.get('./contacts-list.hbs')
    let contactInfoHTML = $.get('./contactInfo.hbs')
    console.log(contacts)

    Promise.all([contactsListHTML, contactInfoHTML])
        .then((response) => {
            console.log(response)

            Handlebars.registerPartial('contactInfo', response[1])
            let template = Handlebars.compile(response[0])
            let context = { contacts }
            let htmlFilled = template(context)
            $('#contacts').append(htmlFilled)
        })

    function showDetails(id) {
        console.log(id)

    }



})