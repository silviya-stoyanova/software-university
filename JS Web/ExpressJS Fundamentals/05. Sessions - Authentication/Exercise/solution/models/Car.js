// write mongoose model here
const mongoose = require('mongoose')

const carSchema = new mongoose.Schema({
    model: { type: String, required: true },
    image: { type: String, required: true },
    pricePerDay: { type: Number, required: true },
    isRented: { type: Boolean, default: false }
})

module.exports = mongoose.model('Car', carSchema)