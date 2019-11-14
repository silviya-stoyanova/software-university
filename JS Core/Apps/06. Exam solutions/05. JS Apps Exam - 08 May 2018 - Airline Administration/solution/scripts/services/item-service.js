const itemService = (() => {

    function create(destination, origin, departureDate, departureTime, seats, cost, img, public, creator) {
        const collection = 'appdata'
        const endpoint = 'flights'
        let authType = 'kinvey'
        let data = { destination, origin, departureDate, departureTime, seats, cost, img, public, creator }

        let response = kinvey.post(collection, endpoint, authType, data)
        return response
    }

    function loadAllItems() {
        let collection = 'appdata'
        let endpoint = 'flights'
        let authType = 'kinvey'

        let response = kinvey.get(collection, endpoint, authType)
        return response
    }

    function loadItemDetails(itemId) {
        let collection = 'appdata'
        let endpoint = 'flights/' + itemId
        let authType = 'kinvey'

        let response = kinvey.get(collection, endpoint, authType)
        return response
    }

    function edit(itemId, destination, origin, departureDate, departureTime, seats, cost, img, public, creator) {
        let collection = 'appdata'
        let endpoint = 'flights/' + itemId
        let authType = 'kinvey'
        let data = { destination, origin, departureDate, departureTime, seats, cost, img, public, creator }

        let response = kinvey.update(collection, endpoint, authType, data)
        return response
    }

    function remove(itemId) {
        let collection = 'appdata'
        let endpoint = 'flights/' + itemId
        let authType = 'kinvey'

        let response = kinvey.del(collection, endpoint, authType)
        return response
    }

    return {
        create,
        loadAllItems,
        loadItemDetails,
        edit,
        remove
    }
})()