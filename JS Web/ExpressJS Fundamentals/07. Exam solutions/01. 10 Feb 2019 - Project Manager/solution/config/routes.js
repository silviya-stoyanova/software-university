const controllers = require('../controllers')
const restrictedPages = require('../config/auth')

module.exports = (app) => {
    app.get('/', controllers.home.index);

    // user routes
    app.get('/user/register', restrictedPages.isGuest, controllers.user.registerGet)
    app.post('/user/register', restrictedPages.isGuest, controllers.user.registerPost)

    app.get('/user/login', controllers.user.loginGet)
    app.post('/user/login', controllers.user.loginPost)

    app.get('/user/profile', restrictedPages.isAuthed, controllers.user.profileGet)
    app.post('/user/logout', restrictedPages.isAuthed, controllers.user.logout)
    app.post('/user/leave/team/:teamId', restrictedPages.isAuthed, controllers.user.leaveTeam)

    // project routes
    app.get('/project/all', restrictedPages.isAuthed, controllers.project.allGet)
    app.post('/project/distribute', restrictedPages.hasRole('Admin'), controllers.project.distribute)

    app.get('/project/create', restrictedPages.hasRole('Admin'), controllers.project.createGet)
    app.post('/project/create', restrictedPages.hasRole('Admin'), controllers.project.createPost)

    // team routes    
    app.get('/team/all', restrictedPages.isAuthed, controllers.team.allGet)
    app.post('/team/distribute', restrictedPages.hasRole('Admin'), controllers.team.distribute)

    app.get('/team/create', restrictedPages.hasRole('Admin'), controllers.team.createGet)
    app.post('/team/create', restrictedPages.hasRole('Admin'), controllers.team.createPost)
}