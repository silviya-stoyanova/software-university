const Article = require('../models/Article')

module.exports = {
  index: async (req, res) => {
    let articles = await Article.find().populate('author')
    res.render('home/index', { articles })
  }
}