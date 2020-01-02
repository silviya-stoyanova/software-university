const Expense = require('../models/Expense')

module.exports = {
  index: async (req, res) => {
    let filter = {}

    if (req.user) {
      filter.user = req.user._id
    }

    let expenses = await Expense.find(filter)
    let monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    let formattedExpenses = []

    expenses.forEach(e => {
      let formattedE = Object.assign({}, e._doc)

      let day = e.date.getDate()
      let month = monthNames[e.date.getMonth()]
      let year = e.date.getFullYear()

      formattedE.date = `${day} ${month} ${year}`
      formattedE.total = e.total.toFixed(2)
      formattedE.category = e.category[0].toUpperCase() + e.category.slice(1)

      formattedExpenses.push(formattedE)
      console.log(formattedE);
    })

    console.log(expenses);

    res.render('home/index', { expenses: formattedExpenses })
  },

  notFound: (req, res) => {
    res.render('home/not-found')
  }
}