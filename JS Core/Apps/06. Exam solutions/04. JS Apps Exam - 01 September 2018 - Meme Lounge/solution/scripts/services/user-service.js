const userService = (() => {
    function isAuth(context) {
        context.loggedIn = sessionStorage.getItem('authtoken')
        context.username = sessionStorage.getItem('username')
    }

    function saveSession(context) {
        let userId = context._id
        let username = context.username
        let authtoken = context._kmd.authtoken

        sessionStorage.setItem('userId', userId)
        sessionStorage.setItem('username', username)
        sessionStorage.setItem('authtoken', authtoken)
    }

    function login(username, password) {
        let collection = 'user'
        let endpoint = 'login'
        let authType = 'basic'
        let data = { username, password }

        let response = kinvey.post(collection, endpoint, authType, data)
        return response
    }

    function register(username, password, email, avatarUrl) {
        let collection = 'user'
        let endpoint = ''
        let authType = 'basic'
        let data = { username, password, email, avatarUrl }

        let response = kinvey.post(collection, endpoint, authType, data)
        return response
    }

    function getProfile(userId) {
        let collection = 'user'
        let endpoint = userId
        let authType = 'kinvey'

        let response = kinvey.get(collection, endpoint, authType)
        return response
    }

    function logout() {
        let collection = 'user'
        let endpoint = '_logout'
        let authType = 'kinvey'

        let response = kinvey.post(collection, endpoint, authType)
        return response
    }

    function destroyUser(userId) {
        let collection = 'user'
        let endpoint = userId
        let authType = 'kinvey'

        let response = kinvey.del(collection, endpoint, authType)
        return response
    }

    return {
        isAuth,
        saveSession,
        login,
        register,
        getProfile,
        logout,
        destroyUser
    }

})()