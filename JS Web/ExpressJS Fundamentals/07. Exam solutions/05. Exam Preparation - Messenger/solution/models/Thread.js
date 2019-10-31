const mongoose = require('mongoose')

const itemSchema = new mongoose.Schema({
    users: {
        type: [{ type: String, required: true }],
        validate: [(data) => data.length === 2] // set the users to be 2
    },
    date: { type: mongoose.Schema.Types.Date, default: Date.now() }
})

const Thread = mongoose.model('Thread', itemSchema)
module.exports = Thread