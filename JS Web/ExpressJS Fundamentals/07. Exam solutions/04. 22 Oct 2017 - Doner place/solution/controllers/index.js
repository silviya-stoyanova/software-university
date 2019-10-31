const homeController = require('./home');
const userController = require('./user');
const donerController = require('./doner')
const orderController = require('./order')

module.exports = {
    home: homeController,
    user: userController,
    doner: donerController,
    order: orderController
}