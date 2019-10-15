function validateRequest(request) {
    let method = request.method
    let uri = request.uri
    let version = request.version
    let message = request.message

    let error = new Error()
    error.message = 'Invalid request header: Invalid '

    if (method === undefined || (method !== 'GET' && method !== 'POST' && method !== 'DELETE' && method !== 'CONNECT')) {
        error.message += 'Method'
        throw error
    }

    if (uri === undefined || (!uri.match(/^([a-zA-Z0-9*]+|\.+)+$/))) {
        error.message += 'URI'
        throw error
    }

    if (version === undefined || (!version.match(/HTTP\/(0.9|1.0|1.1|2.0)/))) {
        error.message += 'Version'
        throw error
    }

    if (message === '') {
        return request
    }

    // Note that the message may be an empty string, but the property must still be present.
    if (message === undefined || (!message.match(/^[^<>\\&'"]+$/))) {
        error.message += 'Message'
        throw error
    }

    return request
}

// try {
//     console.log(validateRequest({
//         method: 'OPTIONS',
//         uri: 'git.master',
//         version: 'HTTP/1.1',
//         message: '-recursive'
//     }))
// 
// } catch (error) {
//     console.log(error.message)
// }