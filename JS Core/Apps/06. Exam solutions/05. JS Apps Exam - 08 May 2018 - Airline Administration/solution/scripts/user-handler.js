const userHandler = (() => {

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
        let password = context.params.pass

        userService.login(username, password)
            .then(function (res) {
                show.success('Login successful.')
                userService.saveSession(res)
                context.redirect('#/home')
            })
            .catch(function (err) {
                show.handleError(err)
            })
            .always(function () {
                $('input').eq(0).val('')
                $('input').eq(1).val('')
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
        let password = context.params.pass
        let repeatPass = context.params.checkPass

        if (username.length >= 5 && password.length > 0 && password === repeatPass) {
            userService.register(username, password)
                .then(function (res) {
                    show.success('User registration successful.')
                    userService.saveSession(res)
                    context.redirect('#/home')
                })
                .catch(function (err) {
                    show.handleError(err)
                })
        } else {
            show.error('The username should be at least 5 characters long. The repeat password should be equal to the password.')
        }
    }

    function logoutUser(context) {
        show.load()

        userService.logout()
            .then(function () {
                show.success('Logout successful.')
                sessionStorage.clear()
                context.redirect('#/user/login')
            })
            .catch(function (err) {
                show.handleError(err)
            })
    }

    return {
        getLogin,
        loginUser,
        getRegister,
        registerUser,
        logoutUser
    }
})()