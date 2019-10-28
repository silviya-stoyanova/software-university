const mongoose = require('mongoose')

const articleSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    date: { type: mongoose.Schema.Types.Date }
})

const Article = mongoose.model('Article', articleSchema)
module.exports = Article