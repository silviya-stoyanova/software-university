const userHandlers = (() => {

    function showHome(context) {
        context.loggedIn = userServices.isAuth()
        context.username = sessionStorage.getItem('username')

        this.loadPartials({
            header: '../views/common/header.hbs',
            footer: '../views/common/footer.hbs'

        }).then(function () {
            this.partial('../views/home/home.hbs')
        })
    }

    function showRegister() {
        this.loadPartials({
            header: '../views/common/header.hbs',
            footer: '../views/common/footer.hbs'

        }).then(function () {
            this.partial('../views/user/register.hbs')
        })
    }

    function registerUser(context) {
        const username = context.params.username
        const password = context.params.password

        if (username.length >= 3 && password.length >= 6) {
            userServices.register(username, password)
                .then(function (res) {
                    context.loggedIn = userServices.isAuth()
                    context.username = sessionStorage.getItem('username')

                    userServices.saveSession(res)
                    notify.showInfo('User registration successful. ☻')
                    context.redirect('#/home')
                })
                .catch(function (err) {
                    notify.handleError(err)
                })

        } else {
            notify.showError('The username should be at least 3 characters long and the password - 6.')
        }

        $('input.form-control').val('')
    }

    function showLogin() {
        this.loadPartials({
            header: '../views/common/header.hbs',
            footer: '../views/common/footer.hbs'

        }).then(function () {
            this.partial('../views/user/login.hbs')
        })
    }

    function loginUser(context) {
        const username = context.params.username
        const password = context.params.password

        userServices.login(username, password)
            .then(function (res) {
                context.loggedIn = userServices.isAuth()
                context.username = sessionStorage.getItem('username')

                userServices.saveSession(res)
                notify.showInfo('Successfully logged in! ♥')
                context.redirect('#/home')
            })
            .catch(function (res) {
                notify.handleError(res)
            })
            .always(function () {
                $('input.form-control').val('')
            })
    }

    function logoutUser(context) {

        userServices.logout()
            .then(function () {
                sessionStorage.clear()
                notify.showInfo('Successfully logged out! ☺')
                context.redirect('#/home')

            })
            .catch(function (err) {
                notify.handleError(err)
            })
    }

    return {
        showHome,
        showLogin,
        loginUser,
        showRegister,
        registerUser,
        logoutUser
    }
})()