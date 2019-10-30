const mongoose = require('mongoose')

const itemSchema = new mongoose.Schema({
    title: { type: String, required: true },
    locked: { type: Boolean, required: true, default: false },
    edits: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Edit' }],
    date: { type: mongoose.Schema.Types.Date, default: Date.now }
}, { usePushEach: true })

const Item = mongoose.model('Item', itemSchema)
module.exports = Item