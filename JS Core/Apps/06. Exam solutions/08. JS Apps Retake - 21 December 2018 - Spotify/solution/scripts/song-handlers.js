const songHandlers = (() => {

    function sortSongs(type, songList) {
        console.log(songList);
        
        let othersSongs = []
        let mySongs = []

        songList.map(song => {
            if (song._acl.creator === sessionStorage.getItem('userId')) {
                song.isCreator = true
                mySongs.push(song)

            } else {
                song.isCreator = false
                othersSongs.push(song)
            }
        })

        othersSongs.sort((a, b) => Number(b.likes) - Number(a.likes))
        mySongs.sort((a, b) => Number(b.likes) - Number(a.likes) || Number(b.listened) - Number(a.listened))

        if (type === 'mine') {
            return mySongs

        } else {
            return othersSongs.concat(mySongs)
        }
    }

    function showMySongs(context) {
        context.loggedIn = userServices.isAuth()
        context.username = sessionStorage.getItem('username')

        songServices.loadSongs()
            .then(function (loadedSongs) {
                context.songs = sortSongs('mine', loadedSongs)

                context.loadPartials({
                    header: '../../views/common/header.hbs',
                    song: '../../views/songs/song.hbs',
                    footer: '../../views/common/footer.hbs'

                }).then(function () {
                    this.partial('../../views/songs/mySongs.hbs')
                })
            })
    }

    function showAllSongs(context) {
        context.loggedIn = userServices.isAuth()
        context.username = sessionStorage.getItem('username') //! important

        songServices.loadSongs()
            .then(function (loadedSongs) {
                context.songs = sortSongs('all', loadedSongs)

                context.loadPartials({
                    header: '../../views/common/header.hbs',
                    song: '../../views/songs/song.hbs',
                    footer: '../../views/common/footer.hbs'

                }).then(function () {
                    this.partial('../../views/songs/allSongs.hbs')
                })
            })
    }

    function getAddSong(context) {
        context.loggedIn = userServices.isAuth()
        context.username = sessionStorage.getItem('username')

        context.loadPartials({
            header: '../../views/common/header.hbs',
            footer: '../../views/common/footer.hbs'

        }).then(function () {
            this.partial('../../views/songs/createSong.hbs')
        })
    }

    function postAddSong(context) {
        let title = context.params.title
        let artist = context.params.artist
        let imageURL = context.params.imageURL
        let likes = 0
        let listened = 0

        if (title.length >= 6 && artist.length >= 3 && imageURL.match(/^http(s)?:\/\/.*$/)) {
            songServices.addSong(title, artist, imageURL, likes, listened)
                .then(function () {
                    notify.showInfo('You have just added a song! ☻')
                    context.redirect('#/allSongs')

                })
                .catch(function (err) {
                    notify.handleError(err)
                })

        } else {
            notify.showError('Invalid data!')
        }

        $('input.form-control').val('')
    }

    function removeSong(context) {
        let songId = context.params.songId.substr(1)

        songServices.getSongInfo(songId)
            .then(function (res) {

                let creatorId = res._acl.creator
                let userId = sessionStorage.getItem('userId')

                if (creatorId === userId) {
                    songServices.delSong(songId)
                    notify.showInfo('Song removed successfully!')

                } else {
                    notify.showError('You can remove only the songs added by you!')
                }
            })
            .then(function () {
                context.redirect('#/allSongs')
            })
    }

    function listenSong(context) {
        // let path = context.path //get the prev page and when listen the song, go to the prev page instead of always going to 'allSongs'
        let songId = context.params.songId.substr(1)

        songServices.getSongInfo(songId)
            .then(function (res) {

                let title = res.title
                let artist = res.artist
                let imageURL = res.imageURL
                let likes = res.likes
                let listened = Number(res.listened) + 1

                songServices.updateSong(songId, title, artist, imageURL, likes, listened)
                    .then(function () {
                        notify.showInfo(`You just listened ${title}`)
                        context.redirect('#/allSongs')
                    })
            })
    }

    function likeSong(context) {
        let songId = context.params.songId.substr(1)

        songServices.getSongInfo(songId)
            .then(function (res) {
                let artist = res.artist
                let title = res.title
                let imageURL = res.imageURL
                let likes = Number(res.likes) + 1
                let listened = res.listened

                songServices.updateSong(songId, title, artist, imageURL, likes, listened)
                    .then(function () {
                        notify.showInfo('Liked!')
                        context.redirect('#/allSongs')
                    })
            })
    }

    return {
        showAllSongs,
        showMySongs,
        getAddSong,
        postAddSong,
        removeSong,
        listenSong,
        likeSong
    }
})()