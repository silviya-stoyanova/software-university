const controllers = require('../controllers')
const restrictedPages = require('../config/auth')

module.exports = (app) => {
    app.get('/', controllers.home.index);

    // user
    app.get('/user/register', controllers.user.registerGet)
    app.post('/user/register', controllers.user.registerPost)

    app.get('/user/login', controllers.user.loginGet)
    app.post('/user/login', controllers.user.loginPost)

    app.get('/user/logout', controllers.user.logout)

    app.get('/user/orders', restrictedPages.isAuthed, controllers.order.getOrdersByCriteria)

    // doner
    app.get('/doner/create', restrictedPages.isAuthed, controllers.doner.createGet)
    app.post('/doner/create', restrictedPages.isAuthed, controllers.doner.createPost)

    app.get('/doner/edit/:donerId', restrictedPages.hasRole('Admin'), controllers.doner.editGet)
    app.post('/doner/edit/:donerId', restrictedPages.hasRole('Admin'), controllers.doner.editPost)

    app.get('/doner/delete/:donerId', restrictedPages.isAuthed, controllers.doner.deleteGet)

    // order
    app.get('/order/doner/:donerId', restrictedPages.isAuthed, controllers.order.orderGet)
    app.post('/order/doner/:donerId', restrictedPages.isAuthed, controllers.order.orderPost)

    app.post('/order/edit', restrictedPages.isAuthed, controllers.order.orderEditPost)

    app.get('/order/all', restrictedPages.hasRole('Admin'), controllers.order.getOrdersByCriteria)

    app.get('/order/details/:orderId', restrictedPages.isAuthed, controllers.order.orderDetails)
    // app.post('/doner/details/:donerId', restrictedPages.isAuthed, controllers.doner.detailsGet)

}