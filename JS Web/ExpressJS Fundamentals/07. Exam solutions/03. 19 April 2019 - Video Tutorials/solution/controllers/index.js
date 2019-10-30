const homeController = require('./home');
const userController = require('./user');
const courseController = require('./course')
const lectureController = require('./lecture')

module.exports = {
    home: homeController,
    user: userController,
    course: courseController,
    lecture: lectureController
}