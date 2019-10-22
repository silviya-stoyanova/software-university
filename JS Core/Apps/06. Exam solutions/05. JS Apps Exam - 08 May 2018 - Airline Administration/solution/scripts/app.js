$(() => {   // on document load..

    const app = Sammy('#container', function () {
        this.use('Handlebars', 'hbs')

        this.get('#/home', itemHandler.getHome)
        this.get('#/user/login', userHandler.getLogin)
        this.get('#/user/register', userHandler.getRegister)
        this.get('#/user/logout', userHandler.logoutUser)

        this.post('#/user/login', userHandler.loginUser)
        this.post('#/user/register', userHandler.registerUser)


        // this.get('#/items/all', itemHandler.getHome)
        this.get('#/items/mine', itemHandler.showMyItems)
        this.get('#/items/details/:itemId', itemHandler.showItemDetails)
        this.get('#/items/create', itemHandler.getCreateItem)
        this.get('#/items/edit/:itemId', itemHandler.getEditItem)
        this.get('#/items/delete/:itemId', itemHandler.delItem)

        this.post('#/items/create', itemHandler.createItem)
        this.post('#/items/edit/:itemId', itemHandler.editItem)
    })

    app.run('#/home')
})