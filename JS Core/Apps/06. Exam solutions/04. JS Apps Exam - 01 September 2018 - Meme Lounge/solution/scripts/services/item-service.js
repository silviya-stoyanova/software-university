const itemService = (() => {

    function create(title, description, imageUrl, creator) {
        const collection = 'appdata'
        const endpoint = 'memes'
        let authType = 'kinvey'
        let data = { title, description, imageUrl, creator }

        let response = kinvey.post(collection, endpoint, authType, data)
        return response
    }

    function loadAllItems() {
        let collection = 'appdata'
        let endpoint = 'memes'
        let authType = 'kinvey'

        let response = kinvey.get(collection, endpoint, authType)
        return response
    }

    function loadItemDetails(itemId) {
        let collection = 'appdata'
        let endpoint = 'memes/' + itemId
        let authType = 'kinvey'

        let response = kinvey.get(collection, endpoint, authType)
        return response
    }

    function edit(itemId, title, description, imageUrl, creator) {
        let collection = 'appdata'
        let endpoint = 'memes/' + itemId
        let authType = 'kinvey'
        let data = { title, description, imageUrl, creator }

        let response = kinvey.update(collection, endpoint, authType, data)
        return response
    }

    function remove(itemId) {
        let collection = 'appdata'
        let endpoint = 'memes/' + itemId
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