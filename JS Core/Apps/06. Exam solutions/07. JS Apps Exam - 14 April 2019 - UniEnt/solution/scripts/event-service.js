const eventService = (() => {

    function organizeEvent(name, dateTime, description, imageURL, organizer, interestedIn) {
        const collection = 'appdata'
        const endpoint = 'events'
        let authType = 'kinvey'
        let data = { name, dateTime, description, imageURL, organizer, interestedIn }

        let response = kinvey.post(collection, endpoint, authType, data)
        return response
    }

    function loadEvents() {
        let collection = 'appdata'
        let endpoint = 'events'
        let authType = 'kinvey'

        let response = kinvey.get(collection, endpoint, authType)
        return response
    }

    function loadEventDetails(eventId) {
        let collection = 'appdata'
        let endpoint = 'events/' + eventId
        let authType = 'kinvey'

        let response = kinvey.get(collection, endpoint, authType)
        return response
    }

    function editEvent(eventId, name, dateTime, description, imageURL, organizer, interestedIn) {
        let collection = 'appdata'
        let endpoint = 'events/' + eventId
        let authType = 'kinvey'
        let data = { name, dateTime, description, imageURL, organizer, interestedIn }

        let response = kinvey.update(collection, endpoint, authType, data)
        return response
    }

    function deleteEvent(eventId) {
        let collection = 'appdata'
        let endpoint = 'events/' + eventId
        let authType = 'kinvey'

        let response = kinvey.del(collection, endpoint, authType)
        return response
    }

    return {
        organizeEvent,
        loadEvents,
        loadEventDetails,
        editEvent,
        deleteEvent
    }
})()