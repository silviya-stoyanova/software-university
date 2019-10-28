const Project = require('../models/Project')

module.exports = {
  index: async (req, res) => {
    let projects = await Project.find().populate('author')
    res.render('home/index', { projects })
  }
}