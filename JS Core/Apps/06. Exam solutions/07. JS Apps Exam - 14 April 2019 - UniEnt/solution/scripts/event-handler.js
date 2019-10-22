const eventHandler = (() => {

    function getOrganizeEvent(context) {
        show.load()
        userService.isAuth(context)

        context.loadPartials({
            header: './templates/common/header.hbs',
            footer: './templates/common/footer.hbs'

        }).then(function () {
            this.partial('./templates/events/organizeEvent.hbs')

        }).catch(function (err) {
            show.error(err)
        })
    }

    function postOrganizeEvent(context) {
        show.load()
        let name = context.params.name
        let dateTime = context.params.dateTime
        let description = context.params.description
        let imageURL = context.params.imageURL
        let organizer = sessionStorage.getItem('username')
        let interestedIn = 0

        let dateTimePattern = /^[0-9]{1,2} [A-Z][a-z]+( - [0-9]{0,2} [AP]M)?$/
        let urlPattern = /http(s)?:\/\//

        if (name.length >= 6 && dateTime.match(dateTimePattern)
            && description.length >= 10 && imageURL.match(urlPattern)) {

            eventService.organizeEvent(name, dateTime, description, imageURL, organizer, interestedIn)
                .then(function (res) {
                    show.success('Event created successfully.')
                    context.redirect('#/home')

                })
                .catch(function (err) {
                    show.error(err)
                })
                .always(function () {
                    $('#inputEventName').val('')
                    $('#inpuEventDate').val('')
                    $('#inputEventDescription').val('')
                    $('#inputEventImage').val('')
                })

        } else {
            show.error('The event name should be at least 6 characters long. he date should be in string format (24 February; 24 March - 10 PM;). The description should be at least 10 characters long. The image should start with "http://" or "https://".')
        }
    }

    function getEvents() {
        show.load()
        return eventService.loadEvents()
    }

    function showEventDetails(context) {
        show.load()
        userService.isAuth(context)
        let eventId = context.params.eventId.substr(1)

        eventService.loadEventDetails(eventId)
            .then(function (eventInfo) {
                context.isOrganizer = context.username === eventInfo.organizer
                context.imageURL = eventInfo.imageURL
                context.name = eventInfo.name
                context.description = eventInfo.description
                context.dateTime = eventInfo.dateTime
                context.interestedIn = eventInfo.interestedIn
                context.organizer = eventInfo.organizer
                context.eventId = eventInfo._id

                context.loadPartials({
                    header: './templates/common/header.hbs',
                    footer: './templates/common/footer.hbs'

                }).then(function () {
                    this.partial('./templates/events/eventDetails.hbs')
                })

            }).catch(function (err) {
                show.error(err)
            })
    }

    function getEditEvent(context) {
        show.load()
        userService.isAuth(context)
        context.eventId = context.params.eventId.substr(1)

        context.loadPartials({
            header: './templates/common/header.hbs',
            footer: './templates/common/footer.hbs'

        }).then(function () {
            this.partial('./templates/events/editEvent.hbs')
        })
    }

    function postEditEvent(context) {
        show.load()
        let eventId = context.params.eventId.substr(1)
        let [name, dateTime, description, imageURL]
            = [context.params.name, context.params.dateTime, context.params.description, context.params.imageURL]

        eventService.loadEventDetails(eventId)
            .then(function (details) {
                let interestedIn = details.interestedIn
                let organizer = details.organizer

                eventService.editEvent(eventId, name, dateTime, description, imageURL, organizer, interestedIn)
                    .then(function (res) {
                        show.success('Event edited successfully.')
                        context.redirect('#/home')
                    })
                    .catch(function (err) {
                        show.handleError(err)
                    })
            })
            .catch(function (err) {
                show.handleError(err)
            })
    }

    function joinEvent(context) {
        show.load()
        let eventId = context.params.eventId.substr(1)

        eventService.loadEventDetails(eventId)
            .then(function (eventInfo) {
                let [name, dateTime, description, imageURL, organizer]
                    = [eventInfo.name, eventInfo.dateTime, eventInfo.description, eventInfo.imageURL, eventInfo.organizer]
                let interestedIn = Number(eventInfo.interestedIn) + 1

                eventService.editEvent(eventId, name, dateTime, description, imageURL, organizer, interestedIn)
                    .then(function () {
                        show.success('You join the event successfully.')
                        context.redirect(`#/eventDetails/:${eventId}`)
                    })
                    .catch(function (err) {
                        show.handleError(err)
                    })
            })
            .catch(function (err) {
                show.handleError(err)
            })

    }

    function delEvent(context) {
        show.load()
        let eventId = context.params.eventId.substr(1)

        eventService.deleteEvent(eventId)
            .then(function () {
                context.redirect('#/home')
            })
            .catch(function (err) {
                show.handleError(err)
            })
    }

    return {
        getOrganizeEvent,
        postOrganizeEvent,
        getEvents,
        showEventDetails,
        getEditEvent,
        postEditEvent,
        joinEvent,
        delEvent
    }
})()