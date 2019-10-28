const controllers = require('../controllers')
const restrictedPages = require('../config/auth')

module.exports = (app) => {
    app.get('/', controllers.home.index);

    app.get('/user/register', controllers.user.registerGet)
    app.post('/user/register', controllers.user.registerPost)

    app.get('/user/login', controllers.user.loginGet)
    app.post('/user/login', controllers.user.loginPost)

    app.get('/user/logout', controllers.user.logout)

    app.get('/user/details', restrictedPages.isAuthed, controllers.user.profileGet)

    app.get('/article/create', restrictedPages.isAuthed, controllers.article.createGet)
    app.post('/article/create', restrictedPages.isAuthed, controllers.article.createPost)

    app.get('/article/details/:articleId', controllers.article.detailsGet) //restrictedPages.isAuthed,

    app.get('/article/edit/:articleId', restrictedPages.isAuthed, controllers.article.editGet)
    app.post('/article/edit/:articleId', restrictedPages.isAuthed, controllers.article.editPost)

    app.get('/article/delete/:articleId', restrictedPages.isAuthed, controllers.article.deleteGet)
    app.post('/article/delete/:articleId', restrictedPages.isAuthed, controllers.article.deletePost)





};

