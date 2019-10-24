const homeController = require('../controllers/home');
const userController = require('../controllers/user');
const carController = require('../controllers/car');

module.exports = {
    home: homeController,
    user: userController,
    car: carController
}