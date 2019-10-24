// write mongoose model here
const mongoose = require('mongoose')

const rentSchema = new mongoose.Schema({
    days: { type: Number, required: true },
    car: { type: mongoose.Schema.Types.ObjectId, ref: 'Car' },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
})

module.exports = mongoose.model('Rent', rentSchema)