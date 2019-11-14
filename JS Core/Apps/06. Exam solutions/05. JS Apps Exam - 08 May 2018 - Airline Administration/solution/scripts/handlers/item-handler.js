const itemHandler = (() => {

    function getHome(context) {
        userService.isAuth(context)
        show.load()

        context.loadPartials({
            header: './templates/common/header.hbs',
            allItems: './templates/items/allItems.hbs',
            footer: './templates/common/footer.hbs'

        }).then(function () {
            let that = this

            itemService.loadAllItems()
                .then(function (itemsList) { //logged in user
                    itemsList = itemsList.filter(c => c.public === 'checked')
                    context.items = itemsList
                })
                .always(function () {
                    that.partial('./templates/home/homePage.hbs')
                })
        })
    }

    function showMyItems(context) {
        userService.isAuth(context)
        show.load()

        context.loadPartials({
            header: './templates/common/header.hbs',
            footer: './templates/common/footer.hbs'

        }).then(function () {
            let that = this

            itemService.loadAllItems()
                .then(function (itemsList) {
                    context.items = []

                    itemsList.map(c => {
                        if (c.creator === sessionStorage.getItem('username')) {
                            context.items.push(c)
                        }
                    })

                    // sort by time in descending
                    context.items.sort((a, b) => {
                        if (a._kmd.ect < b._kmd.ect) {
                            return 1
                        } else {
                            return -1
                        }
                    })
                    that.partial('./templates/items/myItems.hbs')
                })
                .catch(function (err) {
                    show.handleError(err)
                    getHome()
                })
        })
    }

    function getCreateItem(context) {
        show.load()
        userService.isAuth(context)

        context.loadPartials({
            header: './templates/common/header.hbs',
            footer: './templates/common/footer.hbs'

        }).then(function () {
            this.partial('./templates/items/createItem.hbs')
        })
    }

    function createItem(context) {
        show.load()
        let destination = context.params.destination
        let origin = context.params.origin
        let departureDate = context.params.departureDate
        let departureTime = context.params.departureTime
        let seats = context.params.seats
        let cost = context.params.cost
        let img = context.params.img

        let public = ''
        context.params.public === 'on'
            ? public = 'checked'
            : public = ''

        let creator = sessionStorage.getItem('username')

        if (destination.length > 0 && origin.length > 0 && Number(seats) > 0 && Number(cost) > 0) {

            itemService.create(destination, origin, departureDate, departureTime, seats, cost, img, public, creator)
                .then(function () {
                    show.success('Created flight.')
                    context.redirect('#/home')
                })
                .catch(function (err) {
                    show.handleError(err)
                })
        }
    }

    function showItemDetails(context) {
        show.load()
        userService.isAuth(context)
        context.itemId = context.params.itemId.substr(1)

        itemService.loadItemDetails(context.itemId)
            .then(function (itemInfo) {
                context.isCreator = sessionStorage.getItem('username') === itemInfo.creator
                context.destination = itemInfo.destination
                context.origin = itemInfo.origin
                context.departureDate = itemInfo.departureDate
                context.departureTime = itemInfo.departureTime
                context.seats = itemInfo.seats
                context.cost = itemInfo.cost
                context.img = itemInfo.img
                context.public = itemInfo.public

                context.loadPartials({
                    header: './templates/common/header.hbs',
                    footer: './templates/common/footer.hbs'

                }).then(function () {
                    this.partial('./templates/items/detailsItem.hbs')
                })

            }).catch(function (err) {
                show.error(err)
            })
    }

    function getEditItem(context) {
        show.load()
        userService.isAuth(context)
        context.itemId = context.params.itemId.substr(1)

        itemService.loadItemDetails(context.itemId)
            .then(function (itemInfo) {
                console.log(context.itemId);

                context.destination = itemInfo.destination
                context.origin = itemInfo.origin
                context.departureDate = itemInfo.departureDate
                context.departureTime = itemInfo.departureTime
                context.seats = itemInfo.seats
                context.cost = itemInfo.cost
                context.img = itemInfo.img
                context.public = itemInfo.public

                context.loadPartials({
                    header: './templates/common/header.hbs',
                    footer: './templates/common/footer.hbs'

                }).then(function () {
                    this.partial('./templates/items/editItem.hbs')
                })
            })
    }

    function editItem(context) {
        show.load()
        console.log(context);

        let itemId = context.params.itemId.substr(1)

        let [destination, origin, departureDate, departureTime, seats, cost, img,]
            = [context.params.destination, context.params.origin, context.params.departureDate, context.params.departureTime,
            context.params.seats, context.params.cost, context.params.img]

        let public = ''
        context.params.public === 'on'
            ? public = 'checked'
            : public = ''

        let creator = sessionStorage.getItem('username')

        if (destination.length > 0 && origin.length > 0 && Number(seats) > 0 && Number(cost) > 0) {

            itemService.edit(itemId, destination, origin, departureDate, departureTime, seats, cost, img, public, creator)
                .then(function () {
                    show.success(`Successfully edited flight.`)
                    context.redirect('#/home')
                })
                .catch(function (err) {
                    show.handleError(err)
                })
        }
    }

    function delItem(context) {
        show.load()
        let itemId = context.params.itemId.substr(1)

        itemService.remove(itemId)
            .then(function () {
                context.redirect('#/home')
                show.success('Flight deleted.')
            })
            .catch(function (err) {
                show.handleError(err)
            })
    }

    return {
        getHome,
        showMyItems,
        getCreateItem,
        createItem,
        showItemDetails,
        getEditItem,
        editItem,
        delItem
    }
})()