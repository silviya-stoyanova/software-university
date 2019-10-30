const Item = require('../models/Item')

module.exports = {
  index: async (req, res) => {
    let items = await Item.find().populate('edits')
    items = items.sort((a, b) => b.date - a.date)
    let latestArticle = items[0]
    let firstRecentArticle = items[1]
    let secondRecentArticle = items[2]
    let thirdRecentArticle = items[3]

    if (latestArticle) {
      latestArticle.edits = latestArticle.edits.sort((a, b) => b.date - a.date)

      latestArticle.edits.content =
        latestArticle.edits[0].content.split(' ').splice(0, 50).join(' ')
    }

    res.render('home/index', { latestArticle, firstRecentArticle, secondRecentArticle, thirdRecentArticle })
  },

  search: async (req, res) => {
    let items = await Item.find()
    items = items.filter(i => i.title.includes(req.body.search))
    res.render('home/search', { items, search: req.body.search })
  }
}