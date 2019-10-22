const carHandler = (() => {

    function getHome(context) {
        userService.isAuth(context)
        show.load()

        context.loadPartials({
            header: './templates/common/header.hbs',
            allCars: './templates/cars/allCars.hbs',
            guest: './templates/home/guest.hbs',
            footer: './templates/common/footer.hbs'

        }).then(function () {
            let that = this

            carService.loadCars()
                .then(function (carsList) {   //logged in user
                    // sort by car Listing time, descending
                    // '2019-07-28T10:57:27.372Z' < '2019-07-28T11:00:41.520Z'
                    carsList.map(c => {
                        c._acl.creator === sessionStorage.getItem('userId')
                            ? c.isCreator = true
                            : c.isCreator = false
                    })

                    carsList.sort((a, b) => {
                        if (a._kmd.ect < b._kmd.ect) {
                            return 1
                        } else {
                            return -1
                        }
                    })
                    context.cars = carsList
                })
                .always(function () {
                    that.partial('./templates/home/homePage.hbs')
                })
        })
    }

    function showMyCars(context) {
        userService.isAuth(context)
        show.load()

        context.loadPartials({
            header: './templates/common/header.hbs',
            footer: './templates/common/footer.hbs'

        }).then(function () {
            let that = this

            carService.loadCars()
                .then(function (carsList) {
                    context.cars = []

                    carsList.map(c => {
                        if (c.seller === sessionStorage.getItem('username')) {
                            context.cars.push(c)
                        }
                    })

                    context.cars.sort((a, b) => {
                        if (a._kmd.ect < b._kmd.ect) {
                            return 1
                        } else {
                            return -1
                        }
                    })
                })
                .catch(function (err) {
                    show.handleError(err)
                })
                .always(function () {
                    that.partial('./templates/cars/myCars.hbs')
                })
        })
    }

    function getCreateCar(context) {
        show.load()
        userService.isAuth(context)

        context.loadPartials({
            header: './templates/common/header.hbs',
            footer: './templates/common/footer.hbs'

        }).then(function () {
            this.partial('./templates/cars/createCar.hbs')

        })
    }

    function createCar(context) {
        show.load()
        let title = context.params.title
        let description = context.params.description
        let brand = context.params.brand
        let model = context.params.model
        let year = context.params.year
        let imageUrl = context.params.imageUrl
        let fuelType = context.params.fuelType
        let price = context.params.price

        let seller = sessionStorage.getItem('username')
        let urlPattern = /^http/

        if (title.length >= 1 && title.length <= 30 &&
            description.length >= 30 && description.length <= 450 &&
            brand.length >= 1 && brand.length <= 11 &&
            fuelType.length >= 1 && fuelType.length <= 11 &&
            model.length >= 4 && model.length <= 11 &&
            year.length === 4 &&
            Number(price) <= 1000000 && imageUrl.match(urlPattern)) {

            // Ensure you handle properly all HTML special characters, 
            // e.g. the description text could hold "Hi, <peter>".

            carService.create(title, description, brand, model, year, imageUrl, fuelType, price, seller)
                .then(function () {
                    show.success('Listing created.')
                    context.redirect('#/home')
                })
                .catch(function (err) {
                    show.handleError(err)
                })

        } else {
            show.error('The title length must not exceed 33 characters! The description length must not exceed 450 characters and should be at least 30! The brand,fuelType and model length must not exceed 11 characters! The model length should be at least 4 characters! The year must be only 4 chars long! The maximum price is 1000000$! Link url should always start with “http”.')
        }
    }

    function showCarDetails(context) {
        show.load()
        userService.isAuth(context)
        context.carId = context.params.carId.substr(1)

        carService.loadCarDetails(context.carId)
            .then(function (carInfo) {
                context.isCreator = sessionStorage.getItem('username') === carInfo.seller
                context.title = carInfo.title
                context.description = carInfo.description
                context.brand = carInfo.brand
                context.model = carInfo.model
                context.year = carInfo.year
                context.imageUrl = carInfo.imageUrl
                context.fuelType = carInfo.fuelType
                context.price = carInfo.price

                context.loadPartials({
                    header: './templates/common/header.hbs',
                    footer: './templates/common/footer.hbs'

                }).then(function () {
                    this.partial('./templates/cars/detailsCar.hbs')
                })

            }).catch(function (err) {
                show.error(err)
            })
    }

    function getEditCar(context) {
        show.load()
        userService.isAuth(context)
        context.carId = context.params.carId.substr(1)

        carService.loadCarDetails(context.carId)
            .then(function (carInfo) {

                context.title = carInfo.title
                context.description = carInfo.description
                context.brand = carInfo.brand
                context.model = carInfo.model
                context.year = carInfo.year
                context.imageUrl = carInfo.imageUrl
                context.fuelType = carInfo.fuelType
                context.price = carInfo.price

                context.loadPartials({
                    header: './templates/common/header.hbs',
                    footer: './templates/common/footer.hbs'

                }).then(function () {
                    this.partial('./templates/cars/editCar.hbs')
                })
            })
    }

    function editCar(context) {
        show.load()
        let carId = context.params.carId.substr(1)

        let [title, description, brand, model, year, imageUrl, fuelType, price]
            = [context.params.title, context.params.description, context.params.brand, context.params.model,
            context.params.year, context.params.imageUrl, context.params.fuelType, context.params.price]
        let seller = sessionStorage.getItem('username')
        let urlPattern = /^http/

        if (title.length >= 1 && title.length <= 30 &&
            description.length >= 30 && description.length <= 450 &&
            brand.length >= 1 && brand.length <= 11 &&
            fuelType.length >= 1 && fuelType.length <= 11 &&
            model.length >= 4 && model.length <= 11 &&
            year.length === 4 &&
            Number(price) <= 1000000 && imageUrl.match(urlPattern)) {

            carService.edit(carId, title, description, brand, model, year, imageUrl, fuelType, price, seller)
                .then(function () {
                    show.success(`Listing ${title} updated.`)
                    context.redirect('#/home')
                })
                .catch(function (err) {
                    show.handleError(err)
                })
        } else {
            show.error('The title length must not exceed 33 characters! The description length must not exceed 450 characters and should be at least 30! The brand,fuelType and model length must not exceed 11 characters! The model length should be at least 4 characters! The year must be only 4 chars long! The maximum price is 1000000$! Link url should always start with “http”.')
        }
    }

    function delCar(context) {
        show.load()
        let carId = context.params.carId.substr(1)

        carService.remove(carId)
            .then(function () {
                context.redirect('#/home')
            })
            .catch(function (err) {
                show.handleError(err)
            })
    }

    return {
        getHome,
        showMyCars,
        getCreateCar,
        createCar,
        showCarDetails,
        getEditCar,
        editCar,
        delCar
    }
})()