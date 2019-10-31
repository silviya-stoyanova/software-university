const controllers = require('../controllers')
const restrictedPages = require('../config/auth')

module.exports = (app) => {
    app.get('/', controllers.home.index);

    app.get('/user/register', controllers.user.registerGet)
    app.post('/user/register', controllers.user.registerPost)

    app.get('/user/login', controllers.user.loginGet)
    app.post('/user/login', controllers.user.loginPost)

    app.get('/user/logout', restrictedPages.isAuthed, controllers.user.logout)


    app.post('/thread/find', restrictedPages.isAuthed, controllers.thread.findThread)

    app.get('/thread/:otherUser', restrictedPages.isAuthed, controllers.thread.getChatroom)
    app.post('/thread/:otherUser', restrictedPages.isAuthed, controllers.thread.postChatroom)

    app.post('/block/:otherUser', restrictedPages.isAuthed, controllers.thread.blockUser)
    app.post('/unblock/:otherUser', restrictedPages.isAuthed, controllers.thread.unblockUser)

    app.post('/thread/delete/:threadId', restrictedPages.hasRole('Admin'), controllers.thread.deleteThread)
}