const carService = (() => {

    function create(title, description, brand, model, year, imageUrl, fuelType, price, seller) {
        const collection = 'appdata'
        const endpoint = 'cars'
        let authType = 'kinvey'
        let data = { title, description, brand, model, year, imageUrl, fuelType, price, seller }

        let response = kinvey.post(collection, endpoint, authType, data)
        return response
    }

    function loadCars() {
        let collection = 'appdata'
        let endpoint = 'cars'
        let authType = 'kinvey'

        let response = kinvey.get(collection, endpoint, authType)
        return response
    }

    function loadCarDetails(carId) {
        let collection = 'appdata'
        let endpoint = 'cars/' + carId
        let authType = 'kinvey'

        let response = kinvey.get(collection, endpoint, authType)
        return response
    }

    function edit(carId, title, description, brand, model, year, imageUrl, fuelType, price, seller) {
        let collection = 'appdata'
        let endpoint = 'cars/' + carId
        let authType = 'kinvey'
        let data = { title, description, brand, model, year, imageUrl, fuelType, price, seller }

        let response = kinvey.update(collection, endpoint, authType, data)
        return response
    }

    function remove(carId) {
        let collection = 'appdata'
        let endpoint = 'cars/' + carId
        let authType = 'kinvey'

        let response = kinvey.del(collection, endpoint, authType)
        return response
    }

    return {
        create,
        loadCars,
        loadCarDetails,
        edit,
        remove
    }
})()