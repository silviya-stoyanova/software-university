const mongoose = require('mongoose')

const cubeSchema = new mongoose.Schema({
    name: { type: mongoose.Schema.Types.String, min: 3, max: 15, required: true },
    description: { type: mongoose.Schema.Types.String, minlength: 20, maxlength: 300, required: true },
    imageUrl: {
        type: mongoose.Schema.Types.String, match: /^http(s)*:\/\/.*((.jpg)|(.png))$/, required: true
    },
    difficulty: { type: mongoose.Schema.Types.Number, min: 1, max: 6, required: true }
})

const Cube = mongoose.model('Cube', cubeSchema)
module.exports = Cube