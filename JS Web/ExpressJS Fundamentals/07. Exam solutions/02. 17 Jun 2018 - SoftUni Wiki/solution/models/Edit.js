const mongoose = require('mongoose')

const editSchema = new mongoose.Schema({
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    content: { type: String, required: true },
    item: { type: mongoose.Schema.Types.ObjectId, ref: 'Item' },
    date: { type: mongoose.Schema.Types.Date, default: Date.now }
}, { usePushEach: true })

const Edit = mongoose.model('Edit', editSchema)
module.exports = Edit