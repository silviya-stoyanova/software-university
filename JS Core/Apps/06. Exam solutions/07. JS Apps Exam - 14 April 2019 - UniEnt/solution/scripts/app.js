$(() => {   // on document load..

    const app = Sammy('#root', function () {
        this.use('Handlebars', 'hbs')

        this.get('#/home', userHandler.getHome)
        this.get('#/login', userHandler.getLogin)
        this.get('#/register', userHandler.getRegister)
        this.get('#/logout', userHandler.logoutUser)
        this.get('#/myProfile', userHandler.getMyProfile)

        this.post('#/login', userHandler.loginUser)
        this.post('#/register', userHandler.registerUser)

        this.get('#/organizeEvent', eventHandler.getOrganizeEvent)
        this.get('#/eventDetails/:eventId', eventHandler.showEventDetails)
        this.get('#/editEvent/:eventId', eventHandler.getEditEvent)
        this.get('#/closeEvent/:eventId', eventHandler.delEvent)
        this.get('#/joinEvent/:eventId', eventHandler.joinEvent)

        this.post('#/organizeEvent', eventHandler.postOrganizeEvent)
        this.post('#/editEvent/:eventId', eventHandler.postEditEvent)

        // todo: show notifications
    })

    app.run('#/home')
})