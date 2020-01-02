const homeController = require('./home');
const userController = require('./user');
const expenseController = require('./expense')

module.exports = {
    home: homeController,
    user: userController,
    expense: expenseController
}