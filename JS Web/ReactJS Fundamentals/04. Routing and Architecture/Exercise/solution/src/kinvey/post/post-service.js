import kinvey from '../kinvey-requests'

const postService = (() => {

    function create(author, url, title, image, comment) {
        const collection = 'appdata'
        const endpoint = 'posts'
        let authType = 'kinvey'
        let data = { author, url, title, image, comment }

        let response = kinvey.post(collection, endpoint, authType, data)
        return response
    }

    function loadAllPosts() {
        let collection = 'appdata'
        let endpoint = 'posts'
        let authType = 'kinvey'

        let response = kinvey.get(collection, endpoint, authType)
        return response
    }

    function loadPostDetails(postId) {
        let collection = 'appdata'
        let endpoint = 'posts/' + postId
        let authType = 'kinvey'

        let response = kinvey.get(collection, endpoint, authType)
        return response
    }

    function edit(postId, author, url, title, image, comment) {
        let collection = 'appdata'
        let endpoint = 'posts/' + postId
        let authType = 'kinvey'
        let data = {author, url, title, image, comment }

        let response = kinvey.update(collection, endpoint, authType, data)
        return response
    }

    function remove(postId) {
        let collection = 'appdata'
        let endpoint = 'posts/' + postId
        let authType = 'kinvey'

        let response = kinvey.del(collection, endpoint, authType)
        return response
    }

    return {
        create,
        loadAllPosts,
        loadPostDetails,
        edit,
        remove
    }
})()

export default postService