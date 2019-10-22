const userServices = (() => {

    function isAuth() {
        return sessionStorage.getItem('authtoken') !== null
    }

    // function isCreator() {
    //
    //
    // }

    function saveSession(context) {
        sessionStorage.setItem('userId', context._id)
        sessionStorage.setItem('username', context.username)
        sessionStorage.setItem('authtoken', context._kmd.authtoken)
    }

    function register(username, password) {
        let collection = 'user'
        let endpoint = ''
        let authType = 'basic'
        let data = { username, password }

        let response = kinvey.post(collection, endpoint, authType, data)
        return response
    }

    function login(username, password) {
        let collection = 'user'
        let endpoint = 'login'
        let authType = 'basic'
        let data = { username, password }

        let response = kinvey.post(collection, endpoint, authType, data)
        return response
    }

    function logout() {
        let collection = 'user'
        let endpoint = '_logout'
        let authType = 'kinvey'

        let response = kinvey.post(collection, endpoint, authType)
        return response
    }

    return {
        saveSession,
        login,
        logout,
        register,
        isAuth
    }
})()