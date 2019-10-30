const homeController = require('./home');
const userController = require('./user');
const itemController = require('./item')

module.exports = {
    home: homeController,
    user: userController,
    item: itemController
}