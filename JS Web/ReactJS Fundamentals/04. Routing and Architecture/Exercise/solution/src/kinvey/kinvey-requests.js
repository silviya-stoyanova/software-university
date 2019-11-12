const kinvey = (() => {
    const appKey = 'kid_HkJmg1hwB'
    const appSecret = '8e2f9611227a4413b939df4e08b18bc3'
    const baseUrl = 'https://baas.kinvey.com'

    function makeAuth(authType) {
        if (authType === 'basic') {
            return {
                'Authorization': 'Basic ' + btoa(appKey + ':' + appSecret),
                'Content-Type': 'application/json'
            }
        } else {
            return {
                'Authorization': 'Kinvey ' + sessionStorage.getItem('authtoken'),
                'Content-Type': 'application/json'
            }
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
        // let response = $.ajax(request)
        let response = fetch(request.url, {
            method: request.method,
            headers: request.headers
        })
        return response
    }

    function post(collection, endpoint, authType, data) {
        let request = makeRequest('POST', collection, endpoint, authType)
        // request.data = data

        // let response = $.ajax(request)
        let response = fetch(request.url, {
            method: request.method,
            headers: request.headers,
            body: JSON.stringify(data)
        })
        return response
    }

    function update(collection, endpoint, authType, data) {
        let request = makeRequest('PUT', collection, endpoint, authType)
        // request.data = data

        // let response = $.ajax(request)
        let response = fetch(request.url, {
            method: request.method,
            headers: request.headers,
            body: JSON.stringify(data)
        })
        return response
    }

    function del(collection, endpoint, authType) {
        let request = makeRequest('DELETE', collection, endpoint, authType)
        // let response = $.ajax(request)
        let response = fetch(request.url, {
            method: request.method,
            headers: request.headers
        })
        return response
    }

    return {
        get,
        post,
        update,
        del
    }
})()

export default kinvey