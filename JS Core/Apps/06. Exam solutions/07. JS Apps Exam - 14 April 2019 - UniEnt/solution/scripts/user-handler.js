const userHandler = (() => {

    function getHome(context) {
        userService.isAuth(context)
        show.load()

        context.loadPartials({
            header: './templates/common/header.hbs',
            allEvents: './templates/events/allEvents.hbs',
            event: './templates/events/event.hbs',
            noEvents: './templates/events/noEvents.hbs',
            guest: './templates/home/guest.hbs',
            footer: './templates/common/footer.hbs'

        }).then(function () {
            let that = this

            eventHandler.getEvents()
                .then(function (eventsList) {   //logged in user
                    eventsList.sort((a, b) => Number(b.interestedIn) - Number(a.interestedIn))
                    context.events = eventsList
                    that.partial('./templates/home/homePage.hbs')

                }).catch(function (err) {       // logged out user
                    that.partial('./templates/home/homePage.hbs')
                })
        })
    }

    function getLogin(context) {
        show.load()

        context.loadPartials({
            header: './templates/common/header.hbs',
            footer: './templates/common/footer.hbs'

        }).then(function () {
            this.partial('./templates/user/login.hbs')
        })
    }

    function loginUser(context) {
        show.load()
        let username = context.params.username
        let password = context.params.password

        userService.login(username, password)
            .then(function (res) {
                show.success('Login successful.')
                userService.saveSession(res)
                context.redirect('#/home')
            })
            .catch(function (err) {
                // show notiifcation
            })
            .always(function () {
                $('#inputUsername').val('')
                $('#inputPassword').val('')
            })
    }

    function getRegister(context) {
        show.load()

        context.loadPartials({
            header: './templates/common/header.hbs',
            footer: './templates/common/footer.hbs'

        }).then(function () {
            this.partial('./templates/user/register.hbs')
        })
    }

    function registerUser(context) {
        show.load()
        let username = context.params.username
        let password = context.params.password
        let rePassword = context.params.rePassword

        if (username.length >= 3 && password.length >= 6 && password === rePassword) {
            userService.register(username, password)
                .then(function (res) {
                    show.success('User registration successful.')
                    userService.saveSession(res)
                    context.redirect('#/home')
                })
                .catch(function (err) {
                    show.error(err)
                })
        } else {
            show.error('The username should be at least 3 characters long. The password should be at least 6 characters long. The repeat password should be equal to the password.')
        }

        $('#inputUsername').val('')
        $('#inputPassword').val('')
    }

    function logoutUser(context) {
        show.load()

        userService.logout()
            .then(function () {
                show.success('Logout successful.')
                sessionStorage.clear()
                context.redirect('#/home')
            })
            .catch(function (err) {
                show.handleError(err)
            })
    }

    function getMyProfile(context) {
        show.load()
        userService.isAuth(context)

        eventService.loadEvents()
            .then(function (events) {
                let myEvents = []

                events.map(e => {
                    if (e.organizer === sessionStorage.getItem('username')) {
                        myEvents.push(e)
                    }
                })

                myEvents.length > 0
                    ? context.isOrganizer = true
                    : context.isOrganizer = false

                context.events = myEvents
                context.eventsAmount = myEvents.length

                context.loadPartials({
                    header: './templates/common/header.hbs',
                    organizedEvents: './templates/user/organizedEvents.hbs',
                    footer: './templates/common/footer.hbs'

                }).then(function () {
                    this.partial('./templates/user/myProfile.hbs')
                })

            }).catch(function (err) {
                show.handleError(err)
            })
    }

    return {
        getHome,
        getLogin,
        loginUser,
        getRegister,
        registerUser,
        logoutUser,
        getMyProfile
    }
})()