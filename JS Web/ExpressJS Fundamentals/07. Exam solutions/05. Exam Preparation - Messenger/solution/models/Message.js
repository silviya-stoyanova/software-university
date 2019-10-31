const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema({
    content: { type: String, required: true },

    // receiver:
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    thread: { type: mongoose.Schema.Types.ObjectId, ref: 'Thread', required: true }
})

const Message = mongoose.model('Message', messageSchema)
module.exports = Message