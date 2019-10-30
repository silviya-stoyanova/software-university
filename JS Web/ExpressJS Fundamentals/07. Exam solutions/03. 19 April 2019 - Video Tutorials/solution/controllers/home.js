const Course = require('../models/Course')

module.exports = {
  index: async (req, res) => {
    const filter = req.query.search || ''
    let courses = await Course.find({ title: new RegExp(filter, 'i') })
      .populate('lectures')

    res.render('home/index', { courses })
  }
}