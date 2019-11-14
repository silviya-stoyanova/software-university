const itemHandler = (() => {

    function getHome(context) {
        show.load()
        userService.isAuth(context)
        context.myId = sessionStorage.getItem('userId')
        // context.userId = sessionStorage.getItem('userId')

        context.loadPartials({
            header: './templates/common/header.hbs',
            allItems: './templates/items/allItems.hbs',
            guest: './templates/home/guest.hbs',
            footer: './templates/common/footer.hbs'

        }).then(function () {
            let that = this

            itemService.loadAllItems()
                .then(function (itemsList) {   //logged in user
                    // sort by item listing time, descending
                    // '2019-07-28T10:57:27.372Z' < '2019-07-28T11:00:41.520Z'
                    itemsList.map(c => {
                        c.userId = c._acl.creator

                        c._acl.creator === sessionStorage.getItem('userId')
                            ? c.isCreator = true
                            : c.isCreator = false
                    })

                    itemsList.sort((a, b) => {
                        if (a._kmd.ect < b._kmd.ect) {
                            return 1
                        } else {
                            return -1
                        }
                    })

                    context.items = itemsList
                })
                .always(function () {
                    that.partial('../../templates/home/homePage.hbs')
                })
        })
    }

    function getCreateItem(context) {
        show.load()
        userService.isAuth(context)
        context.myId = sessionStorage.getItem('userId')
        // context.userId = sessionStorage.getItem('userId')

        context.loadPartials({
            header: './templates/common/header.hbs',
            footer: './templates/common/footer.hbs'

        }).then(function () {
            this.partial('./templates/items/createItem.hbs')
        })
    }

    function createItem(context) {
        show.load()
        let title = context.params.title
        let description = context.params.description
        let imageUrl = context.params.imageUrl

        let creator = sessionStorage.getItem('username')
        let urlPattern = /^http/

        if (title.length >= 1 && title.length <= 30 &&
            description.length >= 30 && description.length <= 450 &&
            imageUrl.match(urlPattern)) {

            itemService.create(title, description, imageUrl, creator)
                .then(function () {
                    show.success('Listing created.')
                    context.redirect('#/home')
                })
                .catch(function (err) {
                    show.handleError(err)
                })

        } else {
            show.error('The title length must not exceed 33 characters! The description length must not exceed 450 characters and should be at least 30! Link url should always start with “http.')
        }
    }

    function showItemDetails(context) {
        show.load()
        userService.isAuth(context)
        context.myId = sessionStorage.getItem('userId')
        // context.userId = sessionStorage.getItem('userId')
        context.itemId = context.params.itemId.substr(1)

        itemService.loadItemDetails(context.itemId)
            .then(function (itemInfo) {
                context.isCreator = sessionStorage.getItem('username') === itemInfo.creator
                context.title = itemInfo.title
                context.description = itemInfo.description
                context.imageUrl = itemInfo.imageUrl
                context.creator = itemInfo.creator
                context.creatorId = itemInfo._acl.creator

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
        context.myId = sessionStorage.getItem('userId')
        // context.userId = sessionStorage.getItem('userId')
        context.itemId = context.params.itemId.substr(1)

        itemService.loadItemDetails(context.itemId)
            .then(function (itemInfo) {

                context.title = itemInfo.title
                context.description = itemInfo.description
                context.imageUrl = itemInfo.imageUrl

                context.creator = itemInfo.creator

                context.loadPartials({
                    header: './templates/common/header.hbs',
                    footer: './templates/common/footer.hbs'

                }).then(function () {
                    this.partial('./templates/items/editItem.hbs')
                })
            })
            .catch(function (err) {
                show.error(err)
            })
    }

    function editItem(context) {
        show.load()
        let itemId = context.params.itemId.substr(1)

        let [title, description, imageUrl] = [context.params.title, context.params.description, context.params.imageUrl]

        let creator = sessionStorage.getItem('username')
        let urlPattern = /^http/

        if (title.length >= 1 && title.length <= 30 &&
            description.length >= 30 && description.length <= 450 &&
            imageUrl.match(urlPattern)) {

            itemService.edit(itemId, title, description, imageUrl, creator)
                .then(function () {
                    show.success(`Listing ${title} updated.`)
                    context.redirect('#/home')
                })
                .catch(function (err) {
                    show.handleError(err)
                })
        } else {
            show.error('The title length must not exceed 33 characters! The description length must not exceed 450 characters and should be at least 30! Link url should always start with “http.')
        }
    }

    function delItem(context) {
        show.load()
        let itemId = context.params.itemId.substr(1)

        itemService.remove(itemId)
            .then(function () {
                context.redirect('#/home')
                show.success('Item deleted successfully!')
            })
            .catch(function (err) {
                show.handleError(err)
            })
    }

    return {
        getHome,
        getCreateItem,
        createItem,
        showItemDetails,
        getEditItem,
        editItem,
        delItem
    }
})()