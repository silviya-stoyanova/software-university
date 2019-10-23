const mongoose = require('mongoose')

const tagSchema = new mongoose.Schema({
    tagName: { type: String, required: true },
    creationDate: { type: Number, default: Date.now() },
    images: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Image' }]
})

tagSchema.methods.toLowerCase = (tagName) => {
    return tagName.toLowerCase()
}

// console.log(mongoose.model('Tag', tagSchema));
module.exports = mongoose.model('Tag', tagSchema)