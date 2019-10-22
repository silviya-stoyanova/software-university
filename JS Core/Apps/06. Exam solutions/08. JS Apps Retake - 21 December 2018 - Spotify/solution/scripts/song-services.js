const songServices = (() => {

    function getSongInfo(songId) {
        let collection = 'appdata'
        let endpoint = 'songs/' + songId
        let authType = 'kinvey'

        let response = kinvey.get(collection, endpoint, authType)
        return response
    }

    function loadSongs() {
        let collection = 'appdata'
        let endpoint = 'songs'
        let authType = 'kinvey'

        let response = kinvey.get(collection, endpoint, authType)
        return response
    }

    function addSong(title, artist, imageURL, likes, listened) {
        let collection = 'appdata'
        let endpoint = 'songs'
        let authType = 'kinvey'
        let data = { title, artist, imageURL, likes, listened }

        let response = kinvey.post(collection, endpoint, authType, data)
        return response
    }

    function delSong(songId) {
        let collection = 'appdata'
        let endpoint = 'songs/' + songId
        let authType = 'kinvey'

        let response = kinvey.del(collection, endpoint, authType)
        return response
    }

    function updateSong(songId, title, artist, imageURL, likes, listened) {
        let collection = 'appdata'
        let endpoint = 'songs/' + songId
        let authType = 'kinvey'
        let data = { title, artist, imageURL, likes, listened }

        let response = kinvey.update(collection, endpoint, authType, data)
        return response
    }

    return {
        getSongInfo,
        loadSongs,
        addSong,
        delSong,
        updateSong
    }
})()