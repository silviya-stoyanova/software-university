import kinvey from '../kinvey-requests'

const commentService = (() => {

    function create(author, content, postId) {
        const collection = 'appdata'
        const endpoint = 'comments'
        let authType = 'kinvey'
        let data = { author, content, postId }

        let response = kinvey.post(collection, endpoint, authType, data)
        return response
    }

    function loadAllComments() {
        let collection = 'appdata'
        let endpoint = 'comments'
        let authType = 'kinvey'

        let response = kinvey.get(collection, endpoint, authType)
        return response
    }

    function loadCommentDetails(commentId) {
        let collection = 'appdata'
        let endpoint = 'comments/' + commentId
        let authType = 'kinvey'

        let response = kinvey.get(collection, endpoint, authType)
        return response
    }

    function edit(commentId, author, content, postId) {
        let collection = 'appdata'
        let endpoint = 'comments/' + commentId
        let authType = 'kinvey'
        let data = {author, content, postId }

        let response = kinvey.update(collection, endpoint, authType, data)
        return response
    }

    function remove(commentId) {
        let collection = 'appdata'
        let endpoint = 'comments/' + commentId
        let authType = 'kinvey'

        let response = kinvey.del(collection, endpoint, authType)
        return response
    }

    return {
        create,
        loadAllComments,
        loadCommentDetails,
        edit,
        remove
    }
})()

export default commentService