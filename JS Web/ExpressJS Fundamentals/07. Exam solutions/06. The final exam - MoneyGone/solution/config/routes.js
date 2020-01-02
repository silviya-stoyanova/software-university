const controllers = require('../controllers')
const restrictedPages = require('../config/auth')

module.exports = (app) => {
    app.get('/', controllers.home.index);

    // user routes
    app.get('/user/register', restrictedPages.isGuest, controllers.user.registerGet)
    app.post('/user/register', restrictedPages.isGuest, controllers.user.registerPost)

    app.get('/user/login', restrictedPages.isGuest, controllers.user.loginGet)
    app.post('/user/login', restrictedPages.isGuest, controllers.user.loginPost)

    app.post('/user/refill', restrictedPages.isAuthed, controllers.user.refill)

    app.get('/user/profile', restrictedPages.isAuthed, controllers.user.profileGet)
    app.get('/user/logout', restrictedPages.isAuthed, controllers.user.logout)

    // expense routes
    app.get('/expense/create', restrictedPages.isAuthed, controllers.expense.createGet)
    app.post('/expense/create', restrictedPages.isAuthed, controllers.expense.createPost)

    app.get('/expense/details/:expenseId', restrictedPages.isAuthed, controllers.expense.detailsGet)

    app.get('/expense/delete/:expenseId', restrictedPages.isAuthed, controllers.expense.deleteGet)

    app.get('*', controllers.home.notFound)
}