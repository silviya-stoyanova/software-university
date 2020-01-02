const mongoose = require('mongoose')

const expenseSchema = new mongoose.Schema({
    merchant: { type: String, required: true },
    date: { type: mongoose.Schema.Types.Date, required: true, default: Date.now },
    total: { type: Number, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true, minlength: 10, maxlength: 50 },
    report: { type: Boolean, required: true, default: false },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }

})

const Expense = mongoose.model('Expense', expenseSchema)
module.exports = Expense