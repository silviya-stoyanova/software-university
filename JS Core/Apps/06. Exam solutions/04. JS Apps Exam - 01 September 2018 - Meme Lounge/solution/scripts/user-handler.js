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
        let password = context.params.password

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
                $('input').val('')
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
        let repeatPass = context.params.repeatPass
        let email = context.params.email
        let avatarUrl = context.params.avatarUrl

        if (username.match(/^[a-zA-Z]{3,}$/) && password.match(/^[a-zA-Z0-9]{6,}$/) && password === repeatPass) {
            userService.register(username, password, email, avatarUrl)
                .then(function (res) {
                    show.success('User registration successful.')
                    userService.saveSession(res)
                    context.redirect('#/home')
                })
                .catch(function (err) {
                    show.handleError(err)
                })
        } else {
            show.error('You need to validate the input. A username should be at least 3 characters long and should contain only english alphabet letters. A user‘s password should be at least 6 characters long and should contain only english alphabet letters and digits. Both passwords must match.')
        }
    }

    function showProfileInfo(context) {
        show.load()
        userService.isAuth(context)
        context.myId = sessionStorage.getItem('userId')
        context.userId = context.params.userId.substr(1)
        context.isThisUserLoggedIn = context.userId === sessionStorage.getItem('userId')

        context.loadPartials({
            header: './templates/common/header.hbs',
            footer: './templates/common/footer.hbs'

        }).then(function () {
            let that = this

            userService.getProfile(context.userId)
                .then(function (info) {
                    context.avatarUrl = info.avatarUrl
                    context.username = info.username
                    context.email = info.email

                    itemService.loadAllItems()
                        .then(function (itemsList) {
                            context.items = []

                            itemsList.map(i => {
                                if (i._acl.creator === context.userId) {
                                    context.items.push(i)
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

                            that.partial('../../templates/user/profile.hbs')
                        })
                        .catch(function (err) {
                            show.handleError(err)
                        })
                })
                .catch(function (err) {
                    show.handleError(err)
                })
        })
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

    function deleteUser(context) {
        show.load()
        let userId = context.params.userId.substr(1)
        console.log(userId)

        userService.destroyUser(userId)
            .then(function () {
                show.success('User deleted.')
                sessionStorage.clear()
                context.redirect('#/home')
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
        showProfileInfo,
        logoutUser,
        deleteUser
    }
})()