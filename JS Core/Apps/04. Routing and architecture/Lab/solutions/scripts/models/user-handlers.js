const userHandlers = (() => {

    function home() {
        this.loggedIn = sessionStorage.getItem('authtoken')
        this.username = sessionStorage.getItem('username')
        this.hasTeam = Boolean(sessionStorage.getItem('teamId'))
        this.teamId = sessionStorage.getItem('teamId')

        this.loadPartials({
            header: '../templates/common/header.hbs',
            footer: '../templates/common/footer.hbs'
        }).then(function () {
            this.partial('../templates/home/home.hbs')
        })
    }

    function about() {
        this.loggedIn = sessionStorage.getItem('authtoken')
        this.username = sessionStorage.getItem('username')

        this.loadPartials({
            header: '../templates/common/header.hbs',
            footer: '../templates/common/footer.hbs'
        }).then(function () {
            this.partial('../templates/about/about.hbs')
        })
    }

    function showLogin() {
        this.loadPartials({
            header: '../templates/common/header.hbs',
            footer: '../templates/common/footer.hbs',
            loginForm: '../templates/login/loginForm.hbs'
        }).then(function () {
            this.partial('../templates/login/loginPage.hbs')
        })
    }

    function postLogin(context) {   //todo
        let username = context.params.username
        let password = context.params.password
        let mainContext = this

        auth.login(username, password)
            .then(function (context) {
                auth.showInfo('Successfully logged in!')

                //save the session and load Home page
                auth.saveSession(context)
                mainContext.redirect('#/home')

            }).catch(function (context) {
                auth.handleError(context)
            })
    }

    function showReg() {
        this.loadPartials({
            header: '../templates/common/header.hbs',
            footer: '../templates/common/footer.hbs',
            registerForm: '../templates/register/registerForm.hbs'
        }).then(function () {
            this.partial('../templates/register/registerPage.hbs')
        })
    }

    function postReg(context) {
        let username = context.params.username
        let password = context.params.password
        let repeatPassword = context.params.repeatPassword
        let mainContext = this

        auth.register(username, password, repeatPassword)
            .then(function (context) {
                auth.showInfo('Successfully registered!')
                mainContext.redirect('#/home')
            })
            .catch(function (context) {
                auth.handleError(context)
            })
            // clear the input fields
            .always(function () {
                $('#username').val('')
                $('#password').val('')
                $('#repeatPassword').val('')
            })
    }

    function logout() {
        let mainContext = this

        auth.logout()
            .then(function () {
                auth.showInfo('Logged out!')
                sessionStorage.clear()
                mainContext.redirect('#/home')
            })
    }

    

    return {
        home,
        about,
        showLogin,
        postLogin,
        showReg,
        postReg,
        logout
    }
})()