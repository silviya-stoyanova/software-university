// require the other controllers and export them as an object

const homeHandler = require('./home')
const aboutHandler = require('./about')
const createHandler = require('./cube/create')
const detailsHandler = require('./cube/details')

module.exports = {
    home: homeHandler,
    about: aboutHandler,
    create: createHandler,
    details: detailsHandler
}