const Doner = require('../models/Doner')

module.exports = {
  index: async (req, res) => {
    let doners = await Doner.find()
    doners.map(d => {
      return d.category = d.category[0].toUpperCase() + d.category.slice(1)
    })
    res.render('home/index', { doners })
  }
}