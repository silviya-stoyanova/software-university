//todo: likeSong, sort the songs by the given criteria, mySongs

$(() => {
    const app = Sammy('#container', function () {
        this.use('Handlebars', 'hbs')   // this?

        this.get('#/home', userHandlers.showHome)
        this.get('#/login', userHandlers.showLogin)
        this.get('#/register', userHandlers.showRegister)
        this.get('#/logout', userHandlers.logoutUser)

        this.post('#/login', userHandlers.loginUser)
        this.post('#/register', userHandlers.registerUser)


        this.get('#/allSongs', songHandlers.showAllSongs)
        this.get('#/mySongs', songHandlers.showMySongs)
        this.get('#/addSong', songHandlers.getAddSong)
        this.get('#/removeSong/:songId', songHandlers.removeSong)
        this.get('#/listenSong/:songId', songHandlers.listenSong)
        this.get('#/likeSong/:songId', songHandlers.likeSong)

        this.post('#/addSong', songHandlers.postAddSong)


    })

    app.run('#/home')
})