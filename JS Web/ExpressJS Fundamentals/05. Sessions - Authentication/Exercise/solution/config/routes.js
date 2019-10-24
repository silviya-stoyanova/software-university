const controllers = require('../controllers');
const restrictedPages = require('./auth');

module.exports = app => {
    app.get('/', controllers.home.index);

    app.get('/user/register', restrictedPages.isAnonymous, controllers.user.registerGet);
    app.post('/user/register', restrictedPages.isAnonymous, controllers.user.registerPost);

    app.get('/user/login', restrictedPages.isAnonymous, controllers.user.loginGet);
    app.post('/user/login', restrictedPages.isAnonymous, controllers.user.loginPost);

    app.post('/user/logout', restrictedPages.isAuthed, controllers.user.logout);

    app.get('/car/add', restrictedPages.hasRole('Admin'), controllers.car.addGet)
    app.post('/car/add', restrictedPages.hasRole('Admin'), controllers.car.addPost)

    app.get('/car/all', controllers.car.allGet)

    app.get('/car/edit/:carId', restrictedPages.hasRole('Admin'), controllers.car.editGet)
    app.post('/car/edit/:carId', restrictedPages.hasRole('Admin'), controllers.car.editPost)

    app.get('/car/rent/:carId', restrictedPages.isAuthed, controllers.car.rentGet)
    app.post('/car/rent/:carId', restrictedPages.isAuthed, controllers.car.rentPost)

    app.get('/user/rents', restrictedPages.isAuthed, controllers.user.rentsGet)

    app.all('*', (req, res) => {
        res.status(404);
        res.send('404 Not Found');
        res.end();
    });
};