const kinvey = {
    baseUrl: 'https://baas.kinvey.com',
    appKey: 'kid_HyoVG6N-S',
    appSecret: '777a4d34a91c45fe83e670c9acbf5839',

    makeAuth: function (type) {
        let auth = {}

        if (type === 'basic') {
            let encodedData = btoa(this.appKey + ':' + this.appSecret)
            auth.Authorization = 'Basic ' + encodedData

        } else {
            auth.Authorization = 'Kinvey ' + sessionStorage.getItem('authtoken')
        }

        return auth
    },

    makeRequest: function (method, collection, endpoint, authType) {
        let url = `${this.baseUrl}/${collection}/${this.appKey}/${endpoint}`
        let headers = this.makeAuth(authType)

        let request = { method, url, headers }
        return request
    },


    get: function (collection, endpoint, authType) {
        let request = this.makeRequest('GET', collection, endpoint, authType)
        let response = $.ajax(request)
        return response
    },

    post: function (collection, endpoint, authType, data) {
        let request = this.makeRequest('POST', collection, endpoint, authType)
        request.data = data

        let response = $.ajax(request)
        return response
    },

    update: function (collection, endpoint, authType, data) {
        let request = this.makeRequest('PUT', collection, endpoint, authType)
        request.data = data

        let response = $.ajax(request)
        return response
    },

    del: function (collection, endpoint, authType) {
        let request = this.makeRequest('DELETE', collection, endpoint, authType)
        let response = $.ajax(request)
        return response
    }
}