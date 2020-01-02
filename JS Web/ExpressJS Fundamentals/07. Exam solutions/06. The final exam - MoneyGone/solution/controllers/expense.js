const Expense = require('../models/Expense')
const User = require('../models/User')

module.exports = {
    createGet: (req, res) => {
        res.render('expense/create')
    },

    createPost: async (req, res) => {
        let expense = req.body
        let errorMsg = ''
        const categories = ['advertising', 'benefits', 'car', 'equipment', 'fees', 'home-office', 'insurance', 'interest', 'Labor', 'maintenance', 'materials', 'meals-and-entertainment', 'office-supplies', 'other', 'professional-services', 'rent', 'taxes', 'travel', 'utilities']

        if (expense.description.length < 10 || expense.description.length > 50) {
            errorMsg = 'The description should be minimum 10 characters long and 50 characters maximum!'
        }
        if (!categories.includes(expense.category)) {
            errorMsg = 'The category should one from the given options!'
        }
        if (!expense.total || expense.total < 0) {
            errorMsg = 'The total should be positive number!'
        }
        if (expense.merchant.length < 4) {
            errorMsg = 'The merchant should be at least 4 characters long!'
        }

        if (errorMsg) {
            expense.error = errorMsg
            expense.report === 'on'
                ? expense.isReportChecked = 'checked'
                : expense.isReportChecked = ''

            let a = `${expense.category}IsSelected`
            expense[a] = 'selected'
            return res.render('expense/create', expense)
        }

        if (expense.report === 'on') {
            expense.report = true
        }
        expense.user = req.user._id
        expense.date = Date.now()
        let expenseInfo = await Expense.create(expense)

        let user = await User.findById(req.user._id)
        user.expenses.push(expenseInfo._id)
        user.amount -= expense.total
        user.save()

        res.redirect('/')
    },

    detailsGet: async (req, res) => {
        let expense
        try {
            expense = await Expense.findById(req.params.expenseId).populate('user')

            let monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
            let day = expense.date.getDate()
            let month = monthNames[expense.date.getMonth()]
            let year = expense.date.getFullYear()

            let formattedExpense = Object.assign({}, expense._doc)
            formattedExpense.date = `${day} ${month} ${year}`
            formattedExpense.total = expense.total.toFixed(2)
            formattedExpense.category = expense.category[0].toUpperCase() + expense.category.slice(1)

            res.render('expense/details', formattedExpense)

        } catch (err) {
            return res.redirect('/not/found')
        }
    },

    deleteGet: async (req, res) => {
        let expense = await Expense.findById(req.params.expenseId)
        expense.remove()

        await User.findByIdAndUpdate(req.user._id, {
            $pull: { expenses: req.params.expenseId }
        }, (err, response) => {
            if (err) {
                return
            }
        })

        res.redirect('/')
    }
}