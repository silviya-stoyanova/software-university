// check if sofunify.allSongs exests
// and that it is initialized as an empty object

// downloadSong()
// test with artist, song and lyrics
// test with an artist, song and lyrics and with the same artist - several songs
// test with an artist, song and lyrics and with another artist
// test with undefined values for artist, song and lyrics

// playSong()
// test with an existing song and one lyrics
// test with an existing song and more lyrics
// if we do not have any downloaded songs
// test with a non existing song

// songsList
// if there is one downloaded song
// if there are more downloaded songs
// if there are no downloaded songs

// rateArtist()
// to pass an existing artist (a.k.a. only one argument)
// to pass an existing artist and rate (of type number)
// to pass an existing artist and rate (of type string)

// to rate the artist several times
// to rate several artists several times each

// to pass a non existing artist 
// to pass a non existing artist // with rate ?
// to pass no arguments

let SoftUniFy = require('./03. Softunify_Ресурси')
let mocha = require('mocha')
let assert = require('chai').assert

describe('test SoftUniFy', function () {
    let softUniFy = ''
    beforeEach(() => {
        softUniFy = new SoftUniFy()
    })

    it('if sofunify.allSongs exists', function () {
        assert.property(softUniFy, 'allSongs')
    })

    it('if sofunify.allSongs is {}', function () {
        assert.isEmpty(softUniFy.allSongs)
    })

    //the above 2 tests are like thus, bur better
    // it('if sofunify.allSongs is {}', function () {
    //     let softUnify = new SoftUnify()
    //     assert.isEmpty(softUnify.allSongs)
    // })

    it('pass one artist, song and lyrics', function () {
        softUniFy.downloadSong('myArtist', 'my song', 'lalalaaaa')
        let result = softUniFy.allSongs
        assert.equal(result, `{ myArtist: { rate: 0, votes: 0, songs: [ 'my song - lalalaaaa' ] } }`)
    })

    it('pass one artist, and several songs and lyrics', function () {
        softUniFy.downloadSong('myArtist', 'my song', 'lalalaaaa')
        softUniFy.downloadSong('myArtist', 'their song', 'hihihihi')
        let result = softUniFy.allSongs
        assert.equal(result, `{ myArtist: { rate: 0, votes: 0, songs: [ 'my song - lalalaaaa', 'their song - hihihihi' ] } }`)
    })

    it('pass two artists, and several songs and lyrics', function () {
        softUniFy.downloadSong('myArtist', 'my song', 'lalalaaaa')
        softUniFy.downloadSong('myArtist', 'thisIsASong', 'when I see you')
        softUniFy.downloadSong('another artist', 'their song', 'hihihihi')
        let result = softUniFy.allSongs
        assert.equal(result, `{ myArtist: { rate: 0, votes: 0, songs: [ 'my song - lalalaaaa', 'thisIsASong - when I see you' ] }, 'another artist': { rate: 0, votes: 0, songs: [ 'their song - hihihihi' ] } }`)
    })

    it('pass undefined values', function () {
        softUniFy.downloadSong(undefined, undefined, undefined)
        let result = softUniFy.allSongs
        assert.equal(result, `{ undefined: { rate: 0, votes: 0, songs: [ 'undefined - undefined' ] } }`)
    })

    it('pass existing song to playSong() with one lyrics', function () {
        softUniFy.downloadSong('myArtist', 'thisIsASong', 'when I see you')
        let result = softUniFy.playSong()
        assert.equal(result, `myArtist:\nthisIsASong - when I see you`)
    })

    it('pass existing song to playSong() with more lyrics', function () {
        softUniFy.downloadSong('myArtist', 'thisIsASong', 'when I see you')
        softUniFy.downloadSong('myArtist', 'thisIsASong', 'wwwwwwhen I see you')
        let result = softUniFy.playSong()
        assert.equal(result, `myArtist:\nthisIsASong - when I see you\nthisIsASong - wwwwwwhen I see you`)
    })

    it('test playSong() with no songs available', function () {
        let result = softUniFy.playSong('play me')
        assert.equal(result, `You have not downloaded a play me song yet. Use SoftUniFy's function downloadSong() to change that!`)
    })

    it('test playSong() with an unavailable song', function () {
        softUniFy.downloadSong('myArtist', 'thisIsASong', 'wwwwwwhen I see you')
        let result = softUniFy.playSong('play me')
        assert.equal(result, `You have not downloaded a play me song yet. Use SoftUniFy's function downloadSong() to change that!`)
    })

    it('test the songsList getter with only one downloaded song', function () {
        softUniFy.downloadSong('Famous', 'cool', 'blahBlaH')
        let result = softUniFy.songsList
        assert.equal(result, `cool - blahBlaH`)
    })

    it('test the songsList getter with several downloaded songs', function () {
        softUniFy.downloadSong('Famous', 'cool', 'blahBlaH')
        softUniFy.downloadSong('The Best', 'lowerCase', 'bears and wolfs..')
        let result = softUniFy.songsList
        assert.equal(result, `cool - blahBlaH\nlowerCase - bears and wolfs..`)
    })

    it('test the songsList getter with no downloaded songs', function () {
        let result = softUniFy.songsList
        assert.equal(result, 'Your song list is empty')
    })

    it('pass an existing artist to rateArtist()', function () {
        softUniFy.downloadSong('The Best', 'lowerCase', 'bears and wolfs..')
        let result = softUniFy.rateArtist('The Best')
        assert.equal(result, 0)
    })

    it('pass an existing artist and rate (number) to rateArtist()', function () {
        softUniFy.downloadSong('The Best', 'lowerCase', 'bears and wolfs..')
        let result = softUniFy.rateArtist('The Best', 100)
        assert.equal(result, 100)
    })

    it('pass an existing artist and rate (string) to rateArtist()', function () {
        softUniFy.downloadSong('The Best', 'lowerCase', 'bears and wolfs..')
        let result = softUniFy.rateArtist('The Best', '100')
        assert.equal(result, 100)
    })

    it('rate the artist several times', function () {
        softUniFy.downloadSong('The Best', 'lowerCase', 'bears and wolfs..')
        softUniFy.rateArtist('The Best', '100')
        let result = softUniFy.rateArtist('The Best', 1)
        assert.equal(result, 50.5)
    })

    it('rate the artist several times', function () {
        softUniFy.downloadSong('The Best', 'lowerCase', 'bears and wolfs..')
        softUniFy.downloadSong('Famous', 'cool', 'blahBlaH')

        softUniFy.rateArtist('The Best', '100')
        let result = softUniFy.rateArtist('The Best', 1)

        softUniFy.rateArtist('Famous', '50')
        softUniFy.rateArtist('Famous', '125')
        let result2 = softUniFy.rateArtist('Famous', 5)

        assert.equal(result, 50.5)
        assert.equal(result2, 60)
    })


    it('pass a non existing artist', function () {
        softUniFy.downloadSong('The Best', 'lowerCase', 'bears and wolfs..')
        let result = softUniFy.rateArtist('T')
        assert.equal(result, 'The T is not on your artist list.')
    })

    it('pass a non existing artist with rate', function () {
        softUniFy.downloadSong('The Best', 'lowerCase', 'bears and wolfs..')
        let result = softUniFy.rateArtist('T', '100')
        assert.equal(result, 'The T is not on your artist list.')
    })

    it('pass no arguments', function () {
        softUniFy.downloadSong('The Best', 'lowerCase', 'bears and wolfs..')
        let result = softUniFy.rateArtist()
        assert.equal(result, 'The undefined is not on your artist list.')
    })
})