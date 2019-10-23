const resultsHandler = require('./resultsHandler')
const homeHandler = require('./homeHandler')
const addTagHandler = require('./tagHandler')
const searchHandler = require('./searchHandler')
const addImageHandler = require('./addImageHandler')
const staticFileHandler = require('./staticHandler')

module.exports = [resultsHandler, homeHandler, addTagHandler, searchHandler, addImageHandler, staticFileHandler]