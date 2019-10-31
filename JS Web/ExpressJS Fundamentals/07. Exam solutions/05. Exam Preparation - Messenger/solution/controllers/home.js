const Thread = require('../models/Thread')

module.exports = {
  index: async (req, res) => {
    let threads = await Thread.find()

    threads.map(t => {
      t.users.join(' ')
      t.date = new Date(t.date)
      return t
    })
  
    res.render('home/index', { threads })
  }
}