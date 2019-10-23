const mongoose = require('mongoose')

let imageSchema = new mongoose.Schema({
    imageUrl: { type: String, required: true },
    imageTitle: { type: String, required: true },
    description: { type: String, required: true },
    tags: { type: Array, required: true },
    creationDate: { type: Number, default: Date.now() }
})

module.exports = mongoose.model('Image', imageSchema)