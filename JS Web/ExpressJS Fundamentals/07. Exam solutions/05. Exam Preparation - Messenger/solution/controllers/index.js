const homeController = require('./home');
const userController = require('./user');
const threadController = require('./thread')

module.exports = {
    home: homeController,
    user: userController,
    thread: threadController
}