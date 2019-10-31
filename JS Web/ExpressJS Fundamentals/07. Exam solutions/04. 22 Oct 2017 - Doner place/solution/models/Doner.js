const mongoose = require('mongoose')

const donerSchema = new mongoose.Schema({
    category: { type: String, enum: ['chicken', 'lamb', 'beef'], required: true },
    size: { type: Number, min: 17, max: 24, required: true },
    imageUrl: { type: String, match: /^(http(s)*:\/\/)(.+)[\.jpegpn]/ },
    toppings: { type: Array, enum: ['pickle', 'tomato', 'onion', 'lettuce', 'hotSauce', 'extraSauce'] }
})

const Doner = mongoose.model('Doner', donerSchema)
module.exports = Doner