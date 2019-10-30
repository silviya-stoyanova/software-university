const controllers = require('../controllers')
const restrictedPages = require('../config/auth')

module.exports = (app) => {
    app.get('/', controllers.home.index);

    app.get('/user/register', controllers.user.registerGet)
    app.post('/user/register', controllers.user.registerPost)

    app.get('/user/login', controllers.user.loginGet)
    app.post('/user/login', controllers.user.loginPost)

    app.get('/user/logout', controllers.user.logout)


    app.get('/item/create', restrictedPages.isAuthed, controllers.item.createGet)
    app.post('/item/create', restrictedPages.isAuthed, controllers.item.createPost)

    app.get('/item/details/:itemId', controllers.item.itemDetailsGet)
    app.get('/item/all', controllers.item.allItemsGet)

    app.get('/item/history/:itemId', restrictedPages.isAuthed, controllers.item.historyGet)

    app.get('/item/edit/:itemId', restrictedPages.isAuthed, controllers.item.editGet)
    app.post('/item/edit/:itemId', restrictedPages.isAuthed, controllers.item.editPost)

    app.get('/article/lock/:itemId', restrictedPages.isAuthed, controllers.item.lock)
    app.get('/article/unlock/:itemId', restrictedPages.isAuthed, controllers.item.unlock)

    app.post('/search', controllers.home.search)
}