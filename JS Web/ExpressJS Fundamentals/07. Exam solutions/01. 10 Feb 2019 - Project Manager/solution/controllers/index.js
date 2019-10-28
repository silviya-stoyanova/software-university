const homeController = require('./home');
const userController = require('./user');
const projectController = require('./project')
const teamController = require('./team')

module.exports = {
    home: homeController,
    user: userController,
    project: projectController,
    team: teamController
}