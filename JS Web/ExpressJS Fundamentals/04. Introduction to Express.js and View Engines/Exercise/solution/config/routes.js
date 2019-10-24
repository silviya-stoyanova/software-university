const handlers = require('../controllers')

module.exports = app => {

    app.get('/', handlers.home.getHome)
    app.get('/about', handlers.about.getAbout)

    app.get('/create', handlers.create.getCreate)
    app.post('/create', handlers.create.postCreate)

    app.get('/details/:id', handlers.details.getDetails)



};