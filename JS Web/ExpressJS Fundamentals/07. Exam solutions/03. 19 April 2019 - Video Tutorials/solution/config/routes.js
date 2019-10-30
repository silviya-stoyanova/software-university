const controllers = require('../controllers')
const restrictedPages = require('../config/auth')

module.exports = (app) => {
    app.get('/', controllers.home.index);

    // user routes
    app.get('/user/login', controllers.user.loginGet)
    app.post('/user/login', controllers.user.loginPost)

    app.get('/user/register', controllers.user.registerGet)
    app.post('/user/register', controllers.user.registerPost)

    app.post('/user/logout', controllers.user.logout)

    // course routes
    app.get('/course/create', restrictedPages.isAuthed, controllers.course.createGet)
    app.post('/course/create', restrictedPages.isAuthed, controllers.course.createPost)

    app.get('/course/edit/:courseId', restrictedPages.isAuthed, controllers.course.editGet)
    app.post('/course/edit/:courseId', restrictedPages.isAuthed, controllers.course.editPost)

    app.get('/course/details/:courseId', restrictedPages.isAuthed, controllers.course.detailsGet)

    app.post('/course/enroll/:courseId', restrictedPages.isAuthed, controllers.course.enroll)

    // lecture routes
    app.get('/course/:courseId/lecture/create', restrictedPages.isAuthed, controllers.lecture.createGet)
    app.post('/course/:courseId/lecture/create', restrictedPages.isAuthed, controllers.lecture.createPost)

    app.get('/course/:courseId/lecture/delete/:lectureId', restrictedPages.isAuthed, controllers.lecture.remove)

    app.get('/course/:courseId/lecture/play/:lectureId', restrictedPages.isAuthed, controllers.lecture.play)
}