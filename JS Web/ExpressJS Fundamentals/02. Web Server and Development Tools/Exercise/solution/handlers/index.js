const homeHandler = require('./home')
const staticFiles = require('./static-files')
const allMovies = require('./allMovies')
const addMovie = require('./addMovie')
const detailsMovie = require('./detailsMovie')

module.exports = [staticFiles, homeHandler, allMovies, addMovie, detailsMovie]