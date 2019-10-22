const kinvey = (() => {
    const appKey = 'kid_HyoVG6N-S'
    const appSecret = '777a4d34a91c45fe83e670c9acbf5839'
    const baseUrl = 'https://baas.kinvey.com'

    function makeAuth(authType) {
        if (authType === 'basic') {
            return { 'Authorization': 'Basic ' + btoa(appKey + ':' + appSecret) }
        } else {
            return auth = { 'Authorization': 'Kinvey ' + sessionStorage.getItem('authtoken') }
        }
    }

    function makeRequest(method, collection, endpoint, authType) {
        let url = `${baseUrl}/${collection}/${appKey}/${endpoint}`

        const request = {
            method,
            url,
            headers: makeAuth(authType)
        }

        return request
    }

    function get(collection, endpoint, authType) {
        let request = makeRequest('GET', collection, endpoint, authType)
        let response = $.ajax(request)
        return response
    }

    function post(collection, endpoint, authType, data) {
        let request = makeRequest('POST', collection, endpoint, authType)
        request.data = data

        let response = $.ajax(request)
        return response
    }

    function update(collection, endpoint, authType, data) {
        let request = makeRequest('PUT', collection, endpoint, authType)
        request.data = data

        let response = $.ajax(request)
        return response
    }

    function del(collection, endpoint, authType) {
        let request = makeRequest('DELETE', collection, endpoint, authType)
        let response = $.ajax(request)
        return response
    }

    return {
        get,
        post,
        update,
        del
    }
})()